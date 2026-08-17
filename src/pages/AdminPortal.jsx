import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
const API_URL = 'http://localhost:4000'
export default function AdminPortal(){
    const [products, setProducts] = useState([])
    const [loading , setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(()=>{
        fetchProducts()
    },[])
    async function fetchProducts(){
        setLoading(true)
        setError(null)
        try{
            const res=await fetch(`${API_URL}/products`)
            if(!res.ok)throw new Error('Failed to load inventory')
            const data=await res.json()
            setProducts(data)
}    catch(err){
            setError(err.message)
}     finally{
            setLoading(false)

}
}
 //DELETE-remove a product from the inventory entirely
    async function handleDelete(id){
        const confirmed=window.confirm('Remove this product from the inventory?This cannot be undone.')
        if (!confirmed) return
        try{
            await fetch(`${API_URL}/products/${id}`, {method:'DELETE'})
         setProducts((prev) => prev.filter((p) =>p.id!==id))
        }catch(err) {
            console.error('Failed to delete product', err)
        }
    }
    return(
        <div
        className="container">
            <div className="admin-header">
                <div>
                    <div className="eyebrow">Admin Portal</div>
                    <h2>Manage inventory</h2>
                    </div>
                    <Link to="/admin/add"className="btn btn-primary">
                    +Add product
                    </Link>
                    </div>
     {loading && <p className="empty-state">Loading inventory...</p>}
     {error && <p className="empty-state">{error}. Is json-server running on port 4000?
        </p>}
        {!loading && !error &&(<table
            className="admin-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Workload</th>
                    <th>Price</th>
                    <th>Condition</th>
                    <th></th>
                    </tr>
                    </thead>
                    <tbody>

                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.brand}</td>
                        <td>{product.workloadCategory}</td>
                        <td className="mono">KES{product.priceUSD.toLocaleString()}</td>
                        <td>{product.condition}</td>
                        <td>
                       <div className="admin-actions">
                        <Link to={`/admin/edit/${product.id}`} className="link-btn">Edit</Link>
            <button className="link-btn danger" onClick={()=>
            handleDelete(product.id)}>
                Delete
                
            </button>
           </div>
            </td>
            </tr>
            ))}
            </tbody>
            </table>
        )}
        </div>
    )
}


    

    
        
    

