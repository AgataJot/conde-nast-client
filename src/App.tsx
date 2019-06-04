import React from "react";
import styled from "styled-components";
import TextInputForm from "./components/TextInputForm";
import API from "./api";
import SearchResultItem from "./SearchResultItem";
import ButtonSt from "./components/Button";

const AppSt = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const MainSectionSt = styled.section`
    flex: 1 1 calc(100% - 300px);
    max-width: 800px;
    padding: 50px;
`;

interface IAppState {
    hasAPIKey?: boolean;
    searchResults: any[];
    errorMsg?: string;
    cachedSearches: any[];
}

class App extends React.Component<any, IAppState> {
    constructor(params: any) {
        super(params);
        this.state = {
            hasAPIKey: undefined,
            searchResults: [],
            cachedSearches: [],
        };
    }

    async componentDidMount() {
        await this.checkHasAPIKey();
        await this.loadCachedSearches();
    }

    render() {
        const {
            searchResults,
            hasAPIKey,
            errorMsg,
            cachedSearches,
        } = this.state;
        if (typeof hasAPIKey === undefined) {
            return null;
        }

        return (
            <AppSt>
                <MainSectionSt>
                    {errorMsg && (
                        <div>
                            {errorMsg}
                            <button onClick={this.handleDismissErrors}>
                                Dismiss
                            </button>
                        </div>
                    )}
                    {!hasAPIKey && (
                        <TextInputForm
                            val="c98cfc833d6640e1b8d7e0e433a0608e"
                            onSubmit={this.handleAPIKeyEntered}
                            title="Your newsapi.org API key"
                        />
                    )}
                    {hasAPIKey && (
                        <>
                            {
                                <button
                                    disabled={!cachedSearches.length}
                                    onClick={this.handleDeleteCachedResults}
                                >
                                    Delete cached results
                                </button>
                            }
                            <button
                                data-testid="btn-delete-api-key"
                                onClick={this.handleDeleteAPIKey}
                            >
                                Delete API key
                            </button>
                            <TextInputForm
                                onSubmit={this.handleSearch}
                                title="Search newsapi.org"
                                dropdownValues={cachedSearches}
                            />
                            {!!searchResults.length && (
                                <>
                                    <ButtonSt>Prev</ButtonSt>
                                    <ButtonSt>Next</ButtonSt>
                                    <ul style={{ paddingLeft: 0 }}>
                                        {searchResults.map(item => (
                                            <SearchResultItem
                                                {...item}
                                                key={item.url}
                                            />
                                        ))}
                                    </ul>
                                </>
                            )}
                        </>
                    )}
                </MainSectionSt>
            </AppSt>
        );
    }

    private handleDismissErrors = async () => {
        this.setState({
            errorMsg: undefined,
        });
    };

    private handleDeleteAPIKey = async () => {
        try {
            await API.deleteApiKey();
        } catch (error) {}

        await this.checkHasAPIKey();
    };

    private handleDeleteCachedResults = async () => {
        try {
            const cachedSearches = await API.deleteRecentSearches();
            this.setState({ cachedSearches: cachedSearches.recent });
        } catch (error) {}
    };

    private loadCachedSearches = async () => {
        this.setState({
            errorMsg: undefined,
        });
        try {
            const cachedSearches = await API.getRecentSearches();
            this.setState({ cachedSearches: cachedSearches.recent });
        } catch (error) {}
    };

    public checkHasAPIKey = async () => {
        this.setState({
            errorMsg: undefined,
        });

        try {
            const hasAPIKey = await API.checkHasAPIKey();
            this.setState({ hasAPIKey });
        } catch (error) {
            this.setState({
                errorMsg: error.statusText || "Error!",
            });
        }
    };

    private handleSearch = async (searchString = "", page = 1) => {
        try {
            const searchResults = await API.search(searchString, page);
            this.setState({
                errorMsg: undefined,
                searchResults: searchResults.articles,
            });
            this.loadCachedSearches();
        } catch (error) {
            if (error.status === 403) {
                this.setState({ hasAPIKey: false });
            } else {
                this.setState({
                    errorMsg: error.statusText || "Error!",
                });
            }
        }
    };

    private handleAPIKeyEntered = async (key = "") => {
        try {
            await API.setCode(key);
            this.setState({
                errorMsg: undefined,
                hasAPIKey: true,
            });
        } catch (error) {
            this.setState({
                errorMsg: error.statusText || "Error!",
            });
        }
    };
}

export default App;
