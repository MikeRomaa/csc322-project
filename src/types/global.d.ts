declare global {
	// Overrides annoying TypeScript behavior
	interface ObjectConstructor {
		entries<Key extends PropertyKey, Value>(
			obj: Record<Key, Value>,
		): [Key, Value][];
		// biome-ignore lint/suspicious/noExplicitAny: here lie dragons
		keys<Key extends PropertyKey>(obj: Record<Key, any>): Key[];
	}
}
