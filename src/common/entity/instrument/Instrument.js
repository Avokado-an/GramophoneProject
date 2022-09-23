import React from 'react';
import { useState, useEffect } from "react";
import InstrumentsList from './InstrumentIcons';
import { BsFillStarFill, BsDashSquareFill } from "react-icons/bs";
import './../../style/common-styles.css';
import './../../style/common-element-styles.css';
import { Button } from 'react-bootstrap';
import Select from 'react-select';

const Instrument = (props) => {
    const [instrumentIcon, setInstrumentIcon] = useState('');
    const [starsAmount, setStarsAmount] = useState([]);

    const instruments = [
        {
            label: 'Guitar',
            value: 'GUITAR'
        },
        {
            label: 'Drums',
            value: 'DRUMS'
        },
        {
            label: 'Vocal',
            value: 'VOCAL'
        }
    ]

    const skillLevel = [
        {
            label: 1,
            value: 1
        },
        {
            label: 2,
            value: 2
        },
        {
            label: 3,
            value: 3
        },
        {
            label: 4,
            value: 4
        },
        {
            label: 5,
            value: 5
        }
    ]

    const defineInstrumentIcon = (instrumentName) => {
        setInstrumentIcon(InstrumentsList[instrumentName]);
    }

    const defineStarsAmount = () => {
        let stars = Array.from(Array(props.instrument.skillLevel).keys())
        setStarsAmount(stars);
    }

    useEffect(() => {
        defineInstrumentIcon(props.instrument.instrumentName);
        defineStarsAmount();
    }, [props.instrument])

    const updateInstrumentName = (newName) => {
        defineInstrumentIcon(newName);
        let instrumentId = props.instrument.id;
        let skillLevel = starsAmount.length;
        props.handleNameUpdate(instrumentId, newName, skillLevel);
    }

    const updateInstrumentSkillLevel = (skillLevel) => {
        let instrumentId = props.instrument.id;
        let instrumentName = props.instrument.instrumentName;
        props.handleNameUpdate(instrumentId, instrumentName, skillLevel);
    }

    const onDeleteElement = () => {
        let instrumentId = props.instrument.id;
        props.handleItemDelete(instrumentId);
    }

    return (
        <div class="instrument">
            <div class="not-displayed">{props.instrument.id}</div>
            <div class="flex-start-aligned-center">
                {props.instrumentOwner && 
                <Select 
                    className="instrument-name-select padding-right-15 cursor-pointer"
                    id="instrumentName"
                    value={{value: props.instrument.instrumentName,
                            label: String(props.instrument.instrumentName).toLowerCase()
                    }}
                    onChange={(e) => updateInstrumentName(e.value)}
                    options={instruments}
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                >
                </Select>} 
                {!props.instrumentOwner &&
                <div class="padding-right-15">{String(props.instrument.instrumentName).toLowerCase()}</div>
                }
                <div class="padding-right-15 width-20"> {instrumentIcon} </div>
                {props.instrumentOwner && 
                <Select 
                    className="instrument-name-select cursor-pointer padding-right-15"
                    id="skillLevel"
                    value={{value: props.instrument.skillLevel,
                            label: 
                                <div class="display-inherit padding-right-15">{
                                starsAmount.map(i =>
                                    <BsFillStarFill />
                                )}
                                </div>
                    }}
                    onChange={(e) => updateInstrumentSkillLevel(e.value)}
                    options={skillLevel}
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                >
                </Select>} 
                {!props.instrumentOwner && 
                    <div class="display-inherit padding-right-15">{
                    starsAmount.map(i =>
                        <BsFillStarFill />
                    )}
                    </div>
                }
                {props.instrumentOwner &&
                    <Button className="add-instrument-icon" onClick={onDeleteElement}>
                        <BsDashSquareFill className="add-instrument-icon"/>
                    </Button>
                }   
            </div>
        </div>
    )
}

export default Instrument;