import Inferno from 'inferno';

export default function MyApp({ children }) {
    return (
        <div>
          <h1>Hello there</h1>
          { children }
        </div>
    );
}
