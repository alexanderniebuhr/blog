import { createRuntimeEnv } from "src/t3-env"

const env = createRuntimeEnv(import.meta.env)

export default function MyClientComponent() {
	return (
		<>
			<pre>THIS IS A REACT CLIENT COMPONENT</pre>
			<div>
				<pre>{JSON.stringify(env.PUBLIC_API_URL, null, 2)}</pre>
			</div>
		</>
	)
}
