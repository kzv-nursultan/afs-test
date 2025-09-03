import { createBrowserRouter, Outlet } from "react-router-dom";
import { PublicOnly } from "../auth/PublicAway";
import LoginPage from "../pages/LoginPage";
import { RequireAuth } from "../auth/RequireAuth";
import { AppShell } from "../layouts/AppShell/AppShell";
import Rail from "../components/Rail/Rail";
import Logo from "../icons/Logo";
import Company from "../icons/Company";
import Search from "../icons/Search";
import { Sidebar } from "../components/Sidebar/Sidebar";
import OrganizationDetailsPage from "../pages/OrganizationDetail";
import Contractor from "../icons/Contractor";
import Account from "../icons/Account";
import { MOCK_ORGANIZATION_ID } from "../config";

export const router = createBrowserRouter([
  {
    element: <PublicOnly />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },

  {
    element: <RequireAuth />,
    children: [
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
                    to: `/${MOCK_ORGANIZATION_ID}`,
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
                  { label: "Organizations", icon: <Company />, active: true },
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
          { path: "/:id", element: <OrganizationDetailsPage /> },
          { path: "*", element: <h1>Page is not found</h1> },
        ],
      },
    ],
  },
]);
