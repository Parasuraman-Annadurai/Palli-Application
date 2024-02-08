import React from 'react';
import { permissions } from '../../utils/validate';

const PermissionShow = () => {
    return (
        <div>
            <h2>Permission Module</h2>
            {Object.keys(permissions).map(role => (
                <div key={role} style={{ display: 'inline-block', margin: '0 10px' }}>
                    <h3>{role}</h3>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Modules</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Create</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Read</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Update</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Delete</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>All</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions[role].map(permission => (
                                <tr key={permission.module}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{permission.module}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{permission.create ? '✅' : '❌'}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{permission.read ? '✅' : '❌'}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{permission.update ? '✅' : '❌'}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{permission.delete ? '✅' : '❌'}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{permission.all ? '✅' : '❌'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default PermissionShow;