import React from 'react';
import { useRef, useState, useEffect } from "react";
import Instrument from './Instrument.js'
import './../../style/common-styles.css';
import './../../style/common-element-styles.css';
import { Button } from 'react-bootstrap';
import { BsFillPlusSquareFill } from "react-icons/bs";
import axios from 'axios';

const InstrumentsListPlaceholder = (props) => {
    const [updatedInstrumentData, setUpdatedInstrumentData] = useState({
        instrumentName: "GUITAR",
        skillLevel: 1,
        genres: ["ROCK", "BLUES", "JAZZ"]
    });

    useEffect(() => {
        
    }, [props.instruments])

    const onAddInstrument = () => {
        axios.post("http://localhost:8100/profile/instruments", updatedInstrumentData).then(res => {
            props.handleUpdate(res.data);
        });
    }

    const handleNameUpdate = (instrumentId, newName, skillLevel) => {
        let updatedInstrumentData = {
            id: instrumentId, 
            instrumentName: newName,
            skillLevel: skillLevel
        }
        axios.put("http://localhost:8100/profile/instruments", updatedInstrumentData).then(res => {
            props.handleUpdate(res.data);
        })
    }

    const handleItemDelete = instrumentId => {
        let idData = {
            id: instrumentId
        }
        axios.delete("http://localhost:8100/profile/instruments", {data: idData}).then(res => {
            props.handleUpdate(res.data);
        });
    }

    return (
        <div>
            {props.isEditingEnabled && 
                <Button 
                    onClick={onAddInstrument}
                    className="add-instrument-icon"
                >
                    <BsFillPlusSquareFill className="add-instrument-icon" />
                </Button>
            }
            <div class="max-height-65"> {props.instruments
                .sort((a, b) => a.instrumentName > b.instrumentName ? 1 : -1)
                .map((instrument) => {
                return <div>
                <Instrument 
                    instrument={instrument} 
                    handleNameUpdate={handleNameUpdate}
                    instrumentOwner={props.isEditingEnabled}
                    handleItemDelete={handleItemDelete}
                />
                </div>
            })}
            </div>  
        </div>
    )
}

export default InstrumentsListPlaceholder;