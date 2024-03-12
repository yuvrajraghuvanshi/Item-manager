import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [addNewItem,setAddNewItem]=useState("");
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemQty, setItemQty] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [validationError, setValidationError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchItems();
  }, [currentPage, filterTitle, filterStartDate, filterEndDate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setItemImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/items/all?page=${currentPage}&limit=${itemsPerPage}`, {
        params: {
          page: currentPage,
          title: filterTitle,
          startDate: filterStartDate,
          endDate: filterEndDate
        }
      });
      setItems(response.data.items);
      console.log({response})
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.error('Error fetching items', error);
    }
  };

  const addItem = () => {
    const newItem = {
      title: itemName,
      price: itemPrice,
      description: itemDescription,
      qty: itemQty,
      image: itemImage
    };
    setItems([...items, newItem]);
    setAddNewItem(prevItems => [...prevItems, newItem]);
    setItemName('');
    setItemPrice('');
    setItemDescription('');
    setItemQty('')
    setItemImage(null);
  };

  const saveAllItems = async () => {
    try {
      await axios.post('http://localhost:5000/api/items/create/all', {items:addNewItem} );
      console.log('All items saved successfully');
      setItems([]);
      window.location.reload();
    } catch (error) {
      console.error('Error saving all items', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    setCurrentPage(pageNumber);
  };

  const handleFilter = () => {
    setCurrentPage(1); 
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>Item Management</h1>

      <div style={{display:"flex",justifyContent:"center", marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Title"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <label style={{marginTop:"10px"}}>Start Date</label>
        <input
          type="date"
          placeholder="Start Date"
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
          style={{ padding: '8px',marginLeft:"20px",marginRight: '10px' }}
          />
          <label style={{marginTop:"10px"}}>End Date</label>
        <input
          type="date"
          placeholder="End Date"
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
          style={{padding:"8px",marginLeft:"20px", marginRight: '10px' }}
        />
        <button style={{ padding: '8px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={handleFilter}>Filter</button>
      </div>

      {items.length > 0 ? (
        <div>
          <ul className='container mt-5'>
            {items.map((item, index) => (
              <li key={index} className='row'>
             <div className='col-2'>  <strong className='mt-3'>{index +1}</strong> {item.image && (
            <img src={item.image} alt="Item Image" style={{ maxWidth: '50px', maxHeight: '50px' }} />
          )}</div>
                <p className='col-2'><strong>Name:</strong> {item.title}</p>
                <p className='col-2'><strong>Price:</strong> {item.price}</p>
                <p className='col-2'><strong>Qty:</strong> {item.qty}</p>
                <p className='col-2'><strong>Date:</strong> {item.date}</p>
              </li>
            ))}
          </ul>

          <div style={{display:"flex",justifyContent:"center",marginBottom:"15px", marginTop: '20px' }}>
            {console.log(totalItems)}
            {console.log(itemsPerPage)}
  {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, index) => (
    <button
      key={index}
      onClick={() => handlePageChange(index + 1)}
      style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: 'lightgray', border: '1px solid gray', cursor: 'pointer' }}
    >
      {index + 1}
    </button>
  ))}
</div>
        </div>
      ) : (
        <p>No items found</p>
      )}

      <div style={{display:"flex",justifyContent:"center" ,marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input
          type="number"
          placeholder="Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Qty"
          value={itemQty}
          onChange={(e) => setItemQty(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginRight: '10px' }}
        />
        <button style={{ padding: '8px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={addItem}>Add Item</button>
      </div>
<div style={{display:"flex",justifyContent:"center"}}>
      {items.length > 0 && (
        <button style={{padding: '10px 20px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={saveAllItems}>Save Items</button>
      )}
      </div>
      {validationError && (
        <p style={{ color: 'red' }}>{validationError}</p>
      )}
    </div>
  );
}

export default App;
