
const sleep = ms =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
const loadOptions = async (search, prevOptions ,{options}) => {
    await sleep(1000);
    let filteredOptions;
    if (!search) {
        filteredOptions = options;
    } else {
        const searchLower = search.toLowerCase();

        filteredOptions = options.filter(({ label }) =>
            label.toLowerCase().includes(searchLower)
        );
    }

    const hasMore = filteredOptions.length > prevOptions.length + 10;
    const slicedOptions = filteredOptions.slice(
        prevOptions.length,
        prevOptions.length + 10
    );

    return {
        options: slicedOptions,
        hasMore
    };
};

export default loadOptions;
