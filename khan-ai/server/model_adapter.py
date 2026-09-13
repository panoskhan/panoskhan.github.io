class LocalModelAdapter:
    """Deterministic local adapter used until a real model provider is configured."""

    name = "local-echo"

    def generate(self, message: str) -> str:
        return message.strip()
