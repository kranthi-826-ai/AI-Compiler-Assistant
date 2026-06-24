from ollama import chat
from local_fixer import local_fix


def fix_code(code):

    # First try instant local fixes
    fixed = local_fix(code)

    # If local fixes already changed the code,
    # return immediately (super fast)

    if fixed != code:
        return fixed

    # Only call AI if local fixer couldn't help

    prompt = f"""
Return ONLY corrected C code.

Rules:
- Fix syntax errors.
- Fix missing semicolons.
- Fix missing braces.
- Fix missing parentheses.
- Fix misspelled keywords.
- Do not explain.
- Do not add comments.
- Do not use markdown.
- Do not use triple backticks.
- Output only code.

{code}
"""

    response = chat(
        model="qwen2.5-coder:0.5b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    fixed = response["message"]["content"]

    fixed = fixed.replace("```c", "")
    fixed = fixed.replace("```", "")

    return fixed.strip()
