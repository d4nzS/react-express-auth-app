const fetchData = async (requestConfig = {}) => {
    const response = await fetch(requestConfig.url, {
      method: requestConfig.method || 'GET',
      body: JSON.stringify(requestConfig.body) || null,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.message || 'Unexpected error');
    }

    return await response.json();
};

export default fetchData;