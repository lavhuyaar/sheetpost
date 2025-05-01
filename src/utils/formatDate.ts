// Convert UTC date to Indian format
const formatDate = (utcDate: string) => {
    const date: string = new Date(utcDate).toLocaleString("es-IN");
    return date;
  };
  
  export default formatDate;