import React from 'react';
import { ListGroup } from 'react-bootstrap';

import './AutoSuggest.css';

interface IProps {
    exerciseNameList: string[];
    onItemSelect: (name: string) => void;
}

const AutoSuggest = (props: IProps) => {
    return (
        <div className="autosuggest-container">
            {props.exerciseNameList &&
                <ListGroup>
                    {props.exerciseNameList.map((e, key) =>
                        <ListGroup.Item 
                            key={key} 
                            className="autosuggest-item"
                            onClick={(event: any) => props.onItemSelect(e)}
                        >
                            {e}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            }
        </div>
    );
}

export default AutoSuggest;