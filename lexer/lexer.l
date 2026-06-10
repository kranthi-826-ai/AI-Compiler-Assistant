%{
#include <stdio.h>

extern FILE *yyin;
%}

%%

"#include" { printf("PREPROCESSOR : %s\n", yytext); }

\<stdio\.h\> { printf("HEADER       : %s\n", yytext); }

printf|scanf|main { printf("FUNCTION     : %s\n", yytext); }

\"[^\"]*\" { printf("STRING       : %s\n", yytext); }

int|float|char|double|void|if|else|for|while|return { printf("KEYWORD      : %s\n", yytext); }

[0-9]+ { printf("NUMBER       : %s\n", yytext); }

[a-zA-Z_][a-zA-Z0-9_]* { printf("IDENTIFIER   : %s\n", yytext); }

"=="|"!="|"<="|">="|"="|"+"|"-"|"*"|"/"|"<"|">" { printf("OPERATOR     : %s\n", yytext); }

";"|","|"("|")"|"{"|"}"|"["|"]" { printf("SYMBOL       : %s\n", yytext); }

[ \t\r\n]+ ;

. { printf("UNKNOWN      : %s\n", yytext); }

%%

int yywrap()
{
    return 1;
}

int main()
{
    FILE *file = fopen("input.c", "r");

    if(file == NULL)
    {
        printf("Cannot open input.c\n");
        return 1;
    }

    yyin = file;

    yylex();

    fclose(file);

    return 0;
}
