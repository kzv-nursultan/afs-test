import { createBrowserRouter, Outlet } from "react-router-dom";
import { AppShell } from "../layouts/AppShell/AppShell";
import Rail from "../components/Rail/Rail";
import Logo from "../icons/Logo";
import Company from "../icons/Company";
import Search from "../icons/Search";
import OrganizationDetailsPage from "../pages/OrganizationDetail";
import Contractor from "../icons/Contractor";
import Account from "../icons/Account";
import { Sidebar } from "../components/Sidebar/Sidebar";

export const router = createBrowserRouter([
  {
    element: (
      <AppShell
        rail={
          <Rail
            logo={<Logo width={36} height={36} />}
            items={[
              {
                id: "org",
                icon: <Company />,
                ariaLabel: "Organizations",
                to: "/",
              },
              {
                id: "search",
                icon: <Search />,
                ariaLabel: "Search",
                to: "/search",
              },
            ]}
          />
        }
        sidebar={
          <Sidebar
            items={[
              { label: "Organizations", icon: <Company /> },
              { label: "Contractors", icon: <Contractor /> },
              { label: "Clients", icon: <Account /> },
            ]}
          />
        }
      >
        <Outlet />
      </AppShell>
    ),
    children: [
      { index: true, path: "/", element: <OrganizationDetailsPage /> },

      { path: "*", element: <h1>Page is not found</h1> },
    ],
  },
]);
