import React from 'react';
import './ViewCutSheet.css';

const ViewCutSheet = (props) => {


    return (
        <div className="table-container">
            <h1>Cut Sheet</h1>
            <table ref={props.inputRef} className="custom-table">
                <thead>
                    <tr>
                        <th>Program Name</th>
                        <th>Machine</th>
                        <th>Material</th>
                        <th>Run</th>
                    </tr>
                </thead>
                <tbody>
                    {props.cutDetails.bop.map((item, index) => (
                        <tr key={index}>
                            <td>{item.program_name}</td>
                            <td>{item.machine}</td>
                            <td>{item.raw_material}</td>
                            <td>{(props.cutDetails.quantity) / item.unitsPerProgram}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewCutSheet;