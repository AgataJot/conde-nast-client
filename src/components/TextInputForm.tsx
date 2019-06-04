import React, { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import ButtonSt from "./Button";

const InputSt = styled.div`
    flex-grow: 1;
    border-bottom: 1px solid grey;
    position: relative;
    &.focused {
        border-bottom: 1px solid rgb(111, 255, 176);
    }
    & > input {
        width: 100%;
        font-size: 1.8rem;
        font-weight: bold;
        padding: 11px;
        outline: none;
        background: transparent;
        border-radius: 4px;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
    }
`;

const FormSt = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const DropdownSt = styled<any>("section")`
    position: absolute;
    background-color: white;
    transition: height 0.2s;
    height: ${({ isOpen }) => (isOpen ? "300px" : 0)};
    width: 100%;
    top: 100%;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
    margin: 0;
    overflow: scroll;

    ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
    }

    li {
        button {
            outline: none;
            text-decoration: none;
            background: transparent;
            border-style: none;
            flex: 1 0 auto;
            font-size: 1.3rem;
            width: 100%;
            height: 100%;
            text-align: start;
            padding: 12px;
        }
        &:hover {
            background-color: rgba(221, 221, 221, 0.4);
        }
    }
`;

interface IProps {
    title: string;
    onSubmit: (val: string) => any;
    val?: string;
    dropdownValues?: string[];
}
interface IAppState {
    textInputVal: string;
    isFocused: boolean;
    lastSubmittedVal: string;
}

class TextInputForm extends React.Component<IProps, IAppState> {
    constructor(params: any) {
        super(params);
        this.state = {
            textInputVal: this.props.val || "",
            isFocused: false,
            lastSubmittedVal: "",
        };
    }

    private onBlurTimeout?: number;

    componentWillUnmount() {
        clearTimeout(this.onBlurTimeout);
    }

    render() {
        const { dropdownValues = [] } = this.props;
        const { textInputVal, lastSubmittedVal } = this.state;
        const filteredValues = !textInputVal.length
            ? dropdownValues
            : dropdownValues.filter(
                  val => val !== lastSubmittedVal && val.includes(textInputVal),
              );
        return (
            <FormSt onSubmit={this.handleSubmit}>
                <InputSt className={this.state.isFocused ? "focused" : ""}>
                    <input
                        placeholder={this.props.title}
                        autoComplete="off"
                        type="text"
                        value={this.state.textInputVal}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                    {
                        <DropdownSt
                            isOpen={
                                !!filteredValues.length && this.state.isFocused
                            }
                        >
                            <ul>
                                {filteredValues.map(key => (
                                    <li key={key}>
                                        <button
                                            onClick={() =>
                                                this.handleClickItem(key)
                                            }
                                        >
                                            {key}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </DropdownSt>
                    }
                </InputSt>

                <ButtonSt type="submit" value="Submit">
                    submit
                </ButtonSt>
            </FormSt>
        );
    }

    handleBlur = () => {
        this.onBlurTimeout = setTimeout(() => {
            this.setState({ isFocused: false });
        }, 200);
    };

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ textInputVal: e.target.value!, lastSubmittedVal: "" });
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState({ lastSubmittedVal: this.state.textInputVal });
        this.props.onSubmit(this.state.textInputVal);
    };

    handleFocus = () => {
        this.setState({ isFocused: true, textInputVal: "" });
    };

    handleClickItem = (val: string) => {
        this.props.onSubmit(val);
        this.setState({ isFocused: false, textInputVal: val });
    };
}

export default TextInputForm;
