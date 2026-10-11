# The book is built by the platform's console, not here, so the gate is the
# platform's own `book-check` run against this checkout: every page compiled
# into the console, and the platform's tests that read pages.
CORE_DIR ?= ../telmoni

.DEFAULT_GOAL := check

.PHONY: check
check:
	@test -f "$(CORE_DIR)/Makefile" || { \
		echo "✗ no platform checkout at $(CORE_DIR); clone it beside this repository:"; \
		echo "    git clone https://github.com/telmoni/telmoni.git $(CORE_DIR)"; exit 1; }
	$(MAKE) -C $(CORE_DIR) book-check DOCS_DIR=$(CURDIR)
