const url = "http://localhost:4000/item";
        function additemfromhandler(event){
            event.preventDefault();
            const  itemname = document.getElementById('itemname').value;
            const  itemdescription = document.getElementById('description').value;
            const  itemprice = document.getElementById('price').value;
            const  itemquantity = document.getElementById('quantity').value;

            const obj ={
                itemname,
                itemdescription,
                itemprice,
                itemquantity
            }
            // axios.post("http://localhost:4000/item/add-item", obj)
            // .then((res)=>{
            //     showitemonscreen(res.data)
            //     console.log(res)
            // })
            // .catch((err) =>{
            //     document.body.innerHTML = document.body.innerHTML + "<h1> oops something is wrong</h1>"
            //     console.log(err)
            // })
            
            async function postdetails(){
                try {
                    const res = await axios.post(`http://localhost:4000/item/add-item`,obj);
                    showitemonscreen(res.data);
                    console.log(res);
                } catch (error) {
                    console.log(error);
                }
            }
            postdetails();
        }

        window.addEventListener("DOMContentLoaded",() => {
            // axios.get(`http://localhost:4000/item/get-items`)
            // .then((res)=>{
            //     console.log(res)
            //     for(var i=0;i<res.data.allItems.length;i++){
            //         shownewuseronscreen(res.data.allItems[i])
            //         // to print on the screen
            //     }
            // })
            // .catch((err)=>{
            //     console.log(err)
            // })
            
            async function getdetails(){
                try {
                    const res = await axios.get(`http://localhost:4000/item/get-items`)
                    console.log(res.data);
                    for(var i=0;i<res.data.allItems.length;i++){
                        showitemonscreen(res.data.allItems[i]);
                    }
                } 
                catch (error) {
                    console.log(error);   
                }
            }
            getdetails();
        })

        function showitemonscreen(user){
            // console.log(user);
            const parentNode = document.getElementById('listofitems');
            const childElement = `<li id=${user.id}> ${user.itemname} => ${user.itemdescription} =>Rs ${user.itemprice} => ${user.itemquantity}
                <button onclick = buyone('${user.id}','${user.itemname}','${user.itemdescription}','${user.itemprice}','${user.itemquantity}') id = "buy1"> BUY 1 </button>
                <button onclick = buytwo('${user.id}','${user.itemname}','${user.itemdescription}','${user.itemprice}','${user.itemquantity}') id = "buy2"> BUY 2 </button>
                <button onclick = buythree('${user.id}','${user.itemname}','${user.itemdescription}','${user.itemprice}','${user.itemquantity}') id = "buy3"> BUY 3 </button>
                </li>`
            parentNode.innerHTML = parentNode.innerHTML + childElement;
            document.getElementById('itemname').value = '';
            document.getElementById('description').value = '';
            document.getElementById('price').value = '';
            document.getElementById('quantity').value = '';

        }
        
        function showquantity(userid,name,description,price,newQuantity){
            async function updatedetails(){
                try {
                    const res = await axios.put(`http://localhost:4000/item/edit-items/${userid}`,{
                        "itemName" :name,
                        "itemDescription" : description,
                        "itemPrice" : price,
                        "itemQuantity" : newQuantity
                    })
                    
                } catch (error) {
                    console.log(error)
                }
            }
            updatedetails();
            async function getdetails(){
                try {
                    const res = await axios.get(`http://localhost:4000/item/get-items/${userid}`);
                   
                   
                    console.log(res);
                    showitemonscreen(res.data);
                } catch (error) {
                    console.log(error);
                }
            }
            getdetails();
            
        }

        function buyone(userid,name,description,price,quantity){
            if(quantity<= 1){
                alert("0 items left");
                deletefromthescreen(userid);
                return;
            }
            // console.log(userid+" "+name+", "+description+ ", "+price +" , "+quantity);
            quantity= quantity-1;
            const parent = document.getElementById('listofitems');
            const element = document.getElementById(userid);
            parent.removeChild(element);
            showquantity(userid,name,description,price,quantity)
        }

        function buytwo(userid,name,description,price,quantity){
            if(quantity< 2){
                alert("Less than 2 items Left");
                return;
            }else if(quantity === 2){
                deletefromthescreen(userid);
                return;
            }
            quantity= quantity-2;
            const parent = document.getElementById('listofitems');
            const element = document.getElementById(userid);
            parent.removeChild(element);
            showquantity(userid,name,description,price,quantity)
        }
        
        function buythree(userid,name,description,price,quantity){
            if(quantity< 3){
                alert("Less than 3 items Left");
                return;
            }else if(quantity === 3){
                deletefromthescreen(userid);
                return;
            }
            quantity= quantity-3;
            const parent = document.getElementById('listofitems');
            const element = document.getElementById(userid);
            parent.removeChild(element);
            showquantity(userid,name,description,price,quantity)
        }

        


        function deletefromthescreen(userid){
            const parentNode = document.getElementById('listofitems');
            const childtobdeleted = document.getElementById(userid);
            parentNode.removeChild(childtobdeleted);

            async function deleteuser(userid){
                try {
                    const res = await axios.delete(`http://localhost:4000/item/delete-items/${userid}`);
                    console.log(res.data)
                } catch (error) {
                    console.log(error);
                }
            }
            deleteuser(userid);
        }