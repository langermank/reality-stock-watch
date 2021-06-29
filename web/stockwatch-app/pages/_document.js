import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        const setInitialPanelState = `
        function getUserPreference() {
            if(window.localStorage.getItem('panelState')) {
                return window.localStorage.getItem('panelState')
            }
            return 'open'
        }
        document.body.dataset.panelState = getUserPreference();
    `;
        return (
            <Html>
                <Head />
                <body>
                    <script dangerouslySetInnerHTML={{ __html: setInitialPanelState }} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
