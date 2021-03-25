const Promises = require('bluebird');
//const sqlite = require ('sqlite');
//const dbCon = sqlite.open('app.db', {Promises});




const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function openDb() {
  return sqlite.open({
    filename: './app.db',
    driver: sqlite3.Database,
  });
}


//hämtar djur
const getProd = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT name, price, info, made, pic,sale,art, id FROM tavla WHERE art = 'djur'"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  


//hämtar natur
const getProdNatur = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT name, price, info, made, pic,sale,art, id FROM tavla WHERE art = 'natur'"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  
//hämtar urban
const getProdUrban = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT name, price, info, made, pic,sale,art, id FROM tavla WHERE art = 'urban'"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  


//hämtar berg
const getProdBerg = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT name, price, info, made, pic,sale,art, id FROM tavla WHERE art = 'berg'"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  


//hämtar sale
const getProdSale = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT name, price, info, made, pic,sale,art, id FROM tavla WHERE sale = 'yes'"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  

const getUsers = async()=> {
    try {
        const db = await openDb();
        const users = await db.all('SELECT email, id FROM users ORDER BY email ASC');
        return users;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;
    }
};  


//get all
const getAllProd = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT name, price, info, made, pic,sale,art, id FROM tavla"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  

//TA BORT PODUKT
const deleteProd = async(id)=> {
    try {
        const db = await openDb();
        const delprod = await db.all('DELETE FROM tavla WHERE id = ?', [id]);
        
        return delprod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;
    }
};  
//VISA EN USER
const getUser = async (firstname) => {
    const db = await openDb();
    const users = await db.all('SELECT email, firstname, lastname, password, id FROM users WHERE firstname = ?', [firstname]);
    return users;

};
//VISA EN PRODUKT
const getPro = async (id) => {
    const db = await openDb();
    const prod = await db.get('SELECT * FROM tavla WHERE id =  (?)', [id]);
    return prod;

};

//nr 2
const getProdd = async (id) => {
    const db = await openDb();
    const produ = await db.all('SELECT * FROM tavla WHERE id =  (?)', [id]);
    return produ;

};

//UPPDATERA PRODUKT
const updateProd = async(name, price, info,made,pic,sale,art, id)=> {
    try {
        const db = await openDb();
        const upprod = await db.all('UPDATE tavla SET name=?, price=?, info=?, made=?, pic=?, sale=?, art=? WHERE id = ?', [name, price, info,made,pic,sale,art, id]);
        
        return upprod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;
    }
};  
//LÄGG TILL EN PRODUKT
const addProduct = async (name, price, info,made,pic,sale,art) => {
    try { const db = await openDb();
     const produkt = await db.all('INSERT INTO tavla (name, price, info,made,pic,sale,art) VALUES (?, ?, ?,?,?,?,?)', [name, price, info,made,pic,sale,art]);
     return produkt;
     } catch(error) {
         throw error;
     }
 
 };
//LÄGG TILL EN USER
 const addUser = async (email, firstname, lastname, password) => {
    try { const db = await openDb();
     const addU = await db.all('INSERT INTO users (email, firstname, lastname, password) VALUES (?, ?, ?,?)', [email, firstname, lastname, password]);
     return addU;
     } catch(error) {
         throw error;
     }
 
 };
const getPassword = async (email) => {
    const db = await openDb();
    const users = await db.all('SELECT email, password FROM users WHERE email = ?', [email]);
    return users;

}

const updatePass = async (password, email)=>{
    try {
        const db = await openDb();
        const upUsers = await db.all('UPDATE users SET password=? WHERE email = ?', [password, email]);

        return upUsers;
    }
    catch (error) {
        console.log('något gick fel');
        console.log(error);
        return error;
    }
};


//hämtar urban
const getKomUrban = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT tavla, art, name, comment, rating, id FROM post WHERE art = 'Urban'"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  
//hämtar berg kommentar
const getKomBerg = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT tavla, art, name, comment, rating, id FROM post WHERE art = 'Berg'"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  
// hämtar djur kommentarer
const getKomDjur = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT tavla, art, name, comment, rating, id FROM post WHERE art = 'Djur'"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  
// hämtar natur kommentarer
const getKomNatur = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT tavla, art, name, comment, rating, id FROM post WHERE art = 'Natur'"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  

const getKomSale = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT tavla, art, name, comment, rating, id FROM post WHERE art = 'Sale'"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  
const addKomentar = async (tavla, art, name,comment,rating) => {
    try { const db = await openDb();
     const komment = await db.all('INSERT INTO post (tavla, art, name,comment,rating) VALUES (?, ?, ?,?,?)', [tavla, art, name,comment,rating]);
     return komment;
     } catch(error) {
         throw error;
     }
 
 };


//nr 2
const getkommm = async (id) => {
    const db = await openDb();
    const produ = await db.all('SELECT * FROM post WHERE id =  (?)', [id]);
    return produ;

};

//get all
const getAllKomm = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT tavla, art, name, comment, rating, id FROM post"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  


const deletePost = async (id) => {
    try {
        const db = await openDb();
        const delPost = await db.run('DELETE FROM post WHERE id = ?', [id]);
        return delPost;
        console.log('Produkt deleted')
    } catch (error) {
        throw error;
    }

};

const updatePost = async ( tavla, art,name, comment, rating, id) => {
    try {
        const db = await openDb();
        const upPost = await db.all('UPDATE post SET tavla=?, art=?, name=?, comment=?, rating=? WHERE id = ?', [tavla, art, name, comment, rating, id]);

        return upPost;
    }
    catch (error) {
        console.log('något gick fel');
        console.log(error);
        return error;

    }
}

//Hämtar produkt efter namn
const getPos = async (id) => {
    const db = await openDb();
    const post = await db.all('SELECT * FROM post WHERE id =  ?', [id]);
    return post;

};

const getPost = async () =>{
    try {
        const db = await openDb();
        const post = await db.all('SELECT tavla,art,name, comment, rating, id FROM post');
        console.log(post);
        return post;
    }
    catch (error) {
        console.log('Hoppsan, något gick fel.');
        console.log(error);
        return error;
    }
    };

    //Hämtar produkt efter namn
    const getPosss2 = async (id) => {
        const db = await openDb();
        const post = await db.get('SELECT * FROM post WHERE id =  ?', [id]);
        return post;
    
    };

    const addOrder = async (orderID,create_time, status,given_name) => {
        try {
    
            const db = await openDb();
            const users = await db.all('INSERT INTO saveTransaction (orderID, create_time, status,given_name) VALUES (?,?,?,?)', [orderID, create_time, status, given_name]);
            return users;
            
        } catch  {
            
        }
    
    };
//get all
const getAllOrd = async()=> {
    try {
        const db = await openDb();
        const prod = await db.all("SELECT orderID, create_time, status,given_name, id FROM saveTransaction"); //WHERE BINARY `sport` = 'Hockey'"SELECT art FROM tavla WHERE name = 'djur'"
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;    
    }
};  
    const updateOrder = async ( orderID,create_time, status,given_name, id) => {
        try {
            const db = await openDb();
            const upPost = await db.all('UPDATE saveTransaction SET orderID=?, create_time=?, status=?,given_name=? WHERE id = ?', [orderID, create_time, status,given_name,id]);
    
            return upPost;
        }
        catch (error) {
            console.log('något gick fel');
            console.log(error);
            return error;
    
        }
    }
    const deleteOrder = async (id) => {
        try {
            const db = await openDb();
            const delPost = await db.run('DELETE FROM saveTransaction WHERE id = ?', [id]);
            return delPost;
            console.log('Produkt deleted')
        } catch (error) {
            throw error;
        }
    
    };
    //Hämtar produkt efter namn
    const getOrd = async (id) => {
        const db = await openDb();
        const post = await db.all('SELECT * FROM saveTransaction WHERE id =  ?', [id]);
        return post;
    
    };
    
    const getOrder = async () =>{
        try {
            const db = await openDb();
            const post = await db.all('SELECT orderID,create_time,status,given_name, id FROM saveTransaction');
            console.log(post);
            return post;
        }
        catch (error) {
            console.log('Hoppsan, något gick fel.');
            console.log(error);
            return error;
        }
        };
        const getOrderProfil = async () =>{
            try {
                const db = await openDb();
                const post = await db.all('SELECT orderID,create_time,status,given_name, id FROM saveTransaction ORDER BY create_time DESC LIMIT 1');
                console.log(post);
                return post;
            }
            catch (error) {
                console.log('Hoppsan, något gick fel.');
                console.log(error);
                return error;
            }
            };
    
        //Hämtar produkt efter namn
        const getOrddd2 = async (id) => {
            const db = await openDb();
            const post = await db.get('SELECT * FROM saveTransaction WHERE id =  ?', [id]);
            return post;
        
        };

module.exports = {getProd: getProd, getUsers: getUsers, deleteProd: deleteProd, getUser: getUser, getPro, getProd, updateProd: updateProd, addProduct: addProduct, addUser: addUser, getPassword: getPassword, getProdd: getProdd, getProdNatur: getProdNatur, getProdUrban, getProdBerg, getProdSale,getAllProd,openDb,updatePass,getKomUrban,addKomentar,getkommm,getAllKomm
    ,getKomBerg,getKomDjur,getKomNatur,getKomSale,deletePost,updatePost ,getPos,getPosss2,getPost,addOrder,updateOrder,getOrd,getOrder,getOrddd2,
    getAllOrd,deleteOrder,getOrderProfil}; 