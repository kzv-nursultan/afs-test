import { Card } from "../components/Card/Card";
import { NavList } from "../components/NavList/NavList";
import { PageHeader } from "../components/PageHeader/PageHeader";
import Rail from "../components/Rail/Rail";
import { AppShell } from "../layouts/AppShell/AppShell";

export default function OrganizationDetailsPage() {
  return (
    <AppShell
      rail={<Rail />}
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
      <PageHeader
        title="Eternal Rest Funeral Home"
        back={<span>‹</span>}
        actions={<div>{/* edit / delete buttons */}</div>}
      />

      <div style={{ display: "grid", gap: 16 }}>
        <Card title="Company Details" actions={<div>{/* Edit btn */}</div>}>
          {/* 2-col description list */}
          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              rowGap: 12,
            }}
          >
            <dt>Agreement:</dt>
            <dd>1624/2-24 / 03.12.2024</dd>
            <dt>Business entity:</dt>
            <dd>Partnership</dd>
            <dt>Company type:</dt>
            <dd>Funeral Home, Logistics services</dd>
          </dl>
        </Card>

        <Card title="Contacts" actions={<div>{/* Edit btn */}</div>}>
          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              rowGap: 12,
            }}
          >
            <dt>Responsible person:</dt>
            <dd>David Rosenberg</dd>
            <dt>Phone number:</dt>
            <dd>+1 702 555 2345</dd>
            <dt>E-mail:</dt>
            <dd>david_rosenberg88@gmail.com</dd>
          </dl>
        </Card>

        <Card title="Photos" actions={<div>{/* Add btn */}</div>}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}
          >
            <div
              style={{
                height: "96px",
                background: "#ddd",
                borderRadius: "10px",
              }}
            ></div>
            <div
              style={{
                height: "96px",
                background: "#ddd",
                borderRadius: "10px",
              }}
            ></div>
            <div
              style={{
                height: "96px",
                background: "#ddd",
                borderRadius: "10px",
              }}
            ></div>
            <div
              style={{
                height: "96px",
                background: "#ddd",
                borderRadius: "10px",
              }}
            ></div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
