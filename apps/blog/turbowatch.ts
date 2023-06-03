import { watch, type ChangeEvent } from "turbowatch"

const { shutdown } = await watch({
	// Debounces triggers by 1 second.
	// Most multi-file spanning changes are non-atomic. Therefore, it is typically desirable to
	// batch together information about multiple file changes that happened in short succession.
	// Provide { debounce: { wait: 0 } } to disable debounce.
	debounce: {
		wait: 500,
	},
	// The base directory under which all files are matched.
	// Note: This is different from the "root project" (https://github.com/gajus/turbowatch#project-root).
	project: __dirname,
	triggers: [
		{
			// Expression match files based on name.
			// https://github.com/gajus/turbowatch#expressions
			expression: ["allof", ["not", ["dirname", "node_modules"]], ["match", "*", "basename"]],
			// Indicates whether the onChange routine should be triggered on script startup.
			// Defaults to false. Set it to false if you would like onChange routine to not run until the first changes are detected.
			initialRun: true,
			// Determines what to do if a new file change is detected while the trigger is executing.
			// If {interruptible: true}, then AbortSignal will abort the current onChange routine.
			// If {interruptible: false}, then Turbowatch will wait until the onChange routine completes.
			// Defaults to true.
			interruptible: false,
			// Name of the trigger. Used for debugging
			// Must match /^[a-z0-9-_]+$/ pattern and must be unique.
			name: "build",
			// Routine that is executed when file changes are detected.
			onChange: async ({ spawn }: ChangeEvent) => {
				await spawn`moon run blog:build`
			},
			// Routine that is executed when shutdown signal is received.
			// onTeardown: async ({ spawn }) => {
			// 	await spawn`rm -fr ./dist`
			// },
			// Label a task as persistent if it is a long-running process, such as a dev server or --watch mode.
			persistent: false,
			// Retry a task if it fails. Otherwise, watch program will throw an error if trigger fails.
			// Defaults to { retries: 3 }
			retry: {
				retries: 1,
			},
		},
	],
})

// SIGINT is the signal sent when we press Ctrl+C
process.once("SIGINT", () => {
	void shutdown()
})
