import React, { useEffect, useState } from "react";
import { MockRoleService, Role, Permission, RoleId } from "./Mock_Service";
import PermissionsSelector from "./PermissionsSelector";
import Table from "react-bootstrap/Table";

interface RolePermissionsInterface {
  roleService: MockRoleService;
}

const Main: React.FC<RolePermissionsInterface> = ({ roleService }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const roles = await roleService.getRoles();
        const permissions = await roleService.getPermissions();
        setRoles(roles);
        setPermissions(permissions);
      } catch (error) {
        console.error("Error getting data:", error);
        window.location.reload();
      }
    };

    getData();
  }, [roleService]);

  const handlePermissionChange = async (
    roleId: RoleId,
    newPermissions: Permission[]
  ) => {
    try {
      await roleService.setPermissionsForRole(roleId, newPermissions);
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role.id === roleId ? { ...role, permissions: newPermissions } : role
        )
      );
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  return (
    <div className="main-container table-responsive">
      <h5>/users</h5>
      <div className="table-upper-div">
        <span>User Permissions</span>
      </div>
      <Table className="table user-table" bordered hover>
        <thead>
          <tr>
            <th>Role</th>
            {permissions.map((permission) => {
              if (permission.name === "Read Data") {
                return (
                  <th key={permission.id} className="th-read-data">
                    <i className="fa fa-eye" aria-hidden="true"></i>
                    {permission.name}
                  </th>
                );
              } else if (permission.name === "Write Data") {
                return (
                  <th key={permission.id} className="th-write-data">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    {permission.name}
                  </th>
                );
              } else {
                return (
                  <th key={permission.id} className="th-delete-data">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    {permission.name}
                  </th>
                );
              }
            })}
            <th className="th-actions">
              <i className="fa fa-floppy-o" aria-hidden="true"></i> Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => {
            return (
              <tr key={role.id}>
                <td key={role.id} className="td-role-name">
                  {role.name}

                  <div className="td-permissions-div">
                    {role.permissions.map((permission) => {
                      if (permission.name === "Read Data") {
                        return (
                          <span key={permission.id} className="th-read-data">
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </span>
                        );
                      } else if (permission.name === "Write Data") {
                        return (
                          <span key={permission.id} className="th-write-data">
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </span>
                        );
                      } else {
                        return (
                          <span key={permission.id} className="th-delete-data">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </span>
                        );
                      }
                    })}
                  </div>
                </td>

                <PermissionsSelector
                  role={role}
                  permissions={permissions}
                  onPermissionChange={(newPermissions) =>
                    handlePermissionChange(role.id, newPermissions)
                  }
                />
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Main;
