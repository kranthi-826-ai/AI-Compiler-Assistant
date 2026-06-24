import re


def local_fix(code):

    lines = code.split("\n")

    fixed_lines = []

    for line in lines:

        stripped = line.strip()

        # Common keyword fixes

        line = line.replace("retarn", "return")
        line = line.replace("retrn", "return")
        line = line.replace("prntf", "printf")
        line = line.replace("scnaf", "scanf")

        # Colon -> semicolon

        if stripped.endswith(":"):
            line = line[:-1] + ";"

        # Missing semicolon after declarations

        if re.match(
            r'^\s*(int|float|double|char|long)\s+.*[^;{}]\s*$',
            line
        ):
            line += ";"

        # Missing semicolon after printf

        if (
            "printf(" in line
            and not line.strip().endswith(";")
        ):
            line += ";"

        # Missing semicolon after scanf

        if (
            "scanf(" in line
            and not line.strip().endswith(";")
        ):
            line += ";"

        # Missing semicolon after return

        if (
            "return " in line
            and not line.strip().endswith(";")
        ):
            line += ";"

        fixed_lines.append(line)

    fixed_code = "\n".join(fixed_lines)

    # Missing opening brace after main()

    if (
        "main()" in fixed_code
        and "{" not in fixed_code
    ):
        fixed_code = fixed_code.replace(
            "main()",
            "main()\n{"
        )

    # Balance braces

    open_count = fixed_code.count("{")
    close_count = fixed_code.count("}")

    while close_count < open_count:
        fixed_code += "\n}"
        close_count += 1

    return fixed_code
