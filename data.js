const data = [
    {
      brand: 'Yamaha',
      model: 'YZ125',
      year: 1976,
      color: 'Yellow'
    },
    {
      brand: 'Macio',
      model: 'MC400',
      year: 1976,
      color: 'Red'
    },
    {
      brand: 'Honda',
      model: 'CR250M',
      year: 1977,
      color: 'Red'
    },
    {
      brand: 'Suzuki',
      model: 'TM400',
      year: 1974,
      color: 'Yellow'
    },
    {
      brand: 'Husqvarna',
      model: '125CR',
      year: 1974,
      color: 'Orange'
    }
  ];
  
  const getAll = () => data;
  
  // Function to get an item by brand
  const getItem = (brand) => {
    return data.find(item => item.brand === brand);
  }
  
  // Export the functions
  export { getAll, getItem };