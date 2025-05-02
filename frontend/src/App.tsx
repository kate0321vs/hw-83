import {Container} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Register from "./features/Users/Register.tsx";
import Login from "./features/Users/Login.tsx";
import Posts from "./features/Posts/Posts.tsx";
import FullPost from "./features/Posts/FullPost.tsx";


const App = () => {
    return (
        <>
            <header>
                    <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="lg">
                    <Routes>
                        <Route path="/" element={<Posts/>}/>
                        <Route path="/posts" element={<Posts/>}/>
                        <Route path="/posts/:id_post" element={<FullPost/>}/>
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="*" element={(<h1>Not page found</h1>)}/>
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;