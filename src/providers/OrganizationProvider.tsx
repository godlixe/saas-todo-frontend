"use client";

import fetcher from "@/lib/fetcher";
import React from "react";
import { createContext, useEffect, useState, useContext } from "react";
import useSWR from "swr";


type Organization = {
  organizationId: string;
  name: string;
};

type OrganizationContextType = {
  organizations: Organization[];
  selectedOrganization: Organization | null;
  tenantServingURL: String | null;
  membershipLevel: "owner" | "manager" | "member" | null;
  setSelectedOrganization: React.Dispatch<
    React.SetStateAction<Organization | null>
  >;
};

export const OrganizationContext = createContext<OrganizationContextType>({
  organizations: [],
  selectedOrganization: null,
  tenantServingURL: null,
  membershipLevel: null,
  setSelectedOrganization: () => { },
});

type Props = {
  children?: React.ReactNode;
};

const OrganizationProvider: React.FC<Props> = ({ children }) => {
  const { data, mutate } = useSWR("/organization", fetcher);
  const organizations = (Array.isArray(data)) ?
    data?.map((org: any) => {
      return {
        organizationId: org.organization_id,
        name: org.name,
      };
    }) || [] : [];

  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);

  const [tenantServingURL, setTenantServingURL] = useState('')

  const organizationId = selectedOrganization?.organizationId;
  const { data: membershipLevel } = useSWR(
    organizationId && `/organization/level?organization_id=${organizationId}`,
    fetcher
  );

  useEffect(() => {
    if (organizations.length > 0 && !selectedOrganization) {
      const newOrg = organizations.find(
        (org: any) =>
          org.organizationId === sessionStorage.getItem("selectedOrganization")
      );
      setSelectedOrganization(newOrg || organizations[0]);
    }
  }, [data, organizations, selectedOrganization]);


  useEffect(() => {
    if (selectedOrganization) {
      sessionStorage.setItem(
        "selectedOrganization",
        selectedOrganization.organizationId
      );
    }
  }, [selectedOrganization]);

  useEffect(() => {
    if (selectedOrganization == null) {
      return
    }

    const fetchTodos = async () => {
      try {
        console.log(`${process.env.NEXT_PUBLIC_TM_HOST}/api/product/1/tenant/${selectedOrganization.organizationId}`);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TM_HOST}/api/product/1/tenant/${selectedOrganization.organizationId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")} `,
            },
          },
        );
        const data = await response.json();
        setTenantServingURL(data.data.resource_information.serving_url)
        console.log("url : ", tenantServingURL);
      } catch (error) {
        setTenantServingURL("")
        console.log("failed to fetch ", error)
      };
    };

    fetchTodos();

  }, [selectedOrganization, tenantServingURL]);


  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        selectedOrganization,
        tenantServingURL,
        membershipLevel: membershipLevel?.level || null,
        setSelectedOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export default OrganizationProvider;