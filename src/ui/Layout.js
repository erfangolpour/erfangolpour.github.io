import Header from './Header';
import Footer from './Footer';

function Layout(props) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {props.children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;