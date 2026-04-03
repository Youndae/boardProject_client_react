export const buildQueryString = (
    params
) => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if(value !== undefined && value !== '' && value !== null)
            searchParams.append(key, String(value));
    });

    const query = searchParams.toString();
    return query ? `?${query}` : '';
}