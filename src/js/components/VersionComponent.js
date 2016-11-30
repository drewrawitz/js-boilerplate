import Inferno from 'inferno';

const version = '1.0.0-beta15';

function showVersion() {
  console.log(`The version is: ${ version }!`);
}

export default function VersionComponent() {
  return (
    <div>
			<p>This is an Inferno Boilerplate example using <em>Inferno { version }</em>.</p>
			<button onClick={ showVersion }>Show version</button>
		</div>
  );
}
