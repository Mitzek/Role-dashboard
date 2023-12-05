import React, { useState } from 'react';
import {
 
  Role,
  Permission,
  
  PermissionId,
} from "./Mock_Service";


interface PermissionSelectorProps {
  role: Role;
  permissions: Permission[];
  onPermissionChange: (newPermissions: Permission[]) => void;
}

const PermissionsSelector: React.FC<PermissionSelectorProps> = ({
  role,
  permissions,
  onPermissionChange,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    role.permissions
  );

  const handlePermissionToggle = (permissionId: PermissionId) => {
    setSelectedPermissions((prevPermissions) => {
      const isSelected = prevPermissions.some(
        (permission) => permission.id === permissionId
      );

      if (isSelected) {
        return prevPermissions.filter(
          (permission) => permission.id !== permissionId
        );
      } else {
        return [...prevPermissions, permissions.find((p) => p.id === permissionId)!];
      }
    });
  };

  const handleSavePermissions = () => {
    onPermissionChange(selectedPermissions);
  };

  return (
    <>
     
      
        {permissions.map((permission) => {
          return (
            <td key={permission.id}>
            
                <input
                style={{cursor: "pointer"}}
                type="checkbox"
                checked={selectedPermissions.some(
                  (p) => p.id === permission.id
                )}
                onChange={() => handlePermissionToggle(permission.id)}
              />    
            </td>
         )})}
        <td>
      <button className="save-button" onClick={handleSavePermissions}>Save Permissions</button>
      </td>
      </>
  );
};

export default PermissionsSelector;









