SVELTE_SOURCES = $(wildcard src/*.svelte)
TARGETS = $(SVELTE_SOURCES:src/%.svelte=src/%.svelte.js)
all: $(TARGETS)

src/%.svelte.js: src/%.svelte
	npx --no-install svelte-compiler-cli --infile $^ --outfile=$@
	rm $^

clean:
	# very dirty but solves bundler loading svelte file instead of js files 💩
	rm -f $(SVELTE_SOURCES)