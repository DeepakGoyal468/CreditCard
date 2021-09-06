

const Select = (props) => {

    return (
        <select name={props.name} id={props.name}
        style={props.error && {borderColor:"red"}}
        onChange={(event) => props.setExpiry(event.target.value)}>
                <option value="none" disabled selected hidden>{props.default}</option>
                {
                    props.values.map((value, index) => (
                        <option key={index} value={value}>{value}</option>
                    ))
                }
        </select>
    )
}

export default Select;