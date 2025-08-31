import { createBrowserRouter, Outlet } from "react-router-dom";
import { AppShell } from "../layouts/AppShell/AppShell";
import Rail from "../components/Rail/Rail";
import Logo from "../icons/Logo";
import Company from "../icons/Company";
import Search from "../icons/Search";
import { NavList } from "../components/NavList/NavList";
import OrganizationDetailsPage from "../pages/OrganizationDetail";

// The app layout route: AppShell + Rail + Sidebar + Outlet

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
                active: true,
                to: "org",
              },
              { id: "search", icon: <Search />, ariaLabel: "Search", to: "" },
            ]}
          />
        }
        sidebar={
          <NavList
            items={[
              { label: "Organizations", active: true },
              { label: "Contractors" },
              { label: "Clients" },
            ]}
          />
        }
      >
        <Outlet />
      </AppShell>
    ),
    children: [
      { index: true, element: <OrganizationDetailsPage /> },

      { path: "*", element: <h1>Not found</h1> },
    ],
  },
]);
