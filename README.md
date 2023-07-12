# CUAD CS Subteam Materials
This is a website to display the onboarding materials and other documents for the Cornell University Autonomous Drone Project Team. It is inspired by the [CS 3110 Online Textbook](https://cs3110.github.io/textbook/cover.html). It is essentially a file viewer for [markdown](https://www.markdownguide.org/getting-started/) (.md) files using [Marked](https://marked.js.org/), it uses [Prism](https://prismjs.com/) to do code syntax highlighting, [psudocode.js](https://github.com/SaswatPadhi/pseudocode.js) to render psudocode and [GitHub Pages](https://pages.github.com/) for hosting.

## How it works
As I've said, the core of this website is a markdown file viewer. If you want to add or edit pages, I suggest looking at a [markdown cheat sheet](https://www.markdownguide.org/cheat-sheet/). Just like typical markdown, it supports KaTeX inline and block math notation using `$...$` and `$$...$$`, like $\frac{1}{2}$ and 
$$\sum_{n=1}^\infty {\frac{1}{n^2} = \frac{\pi^2}{6}}$$
The only differences to a typical markdown are code blocks. When you provide a language at the top of a code block, this site will add a copy icon that users can click to copy the code block.
```Python
# This is some example Python code that supports syntax highlighting and quick copying
def example_function(args):
    print("hello world!")
    return 5
```
When the language is omitted, so is the copy icon. This is primarily to allow the display of file structures.
```
This is a code block with no language specified.
```
Finally, to display psudocode, you can specify the language as *algorithm* and then use [psudocode.js syntax](https://github.com/SaswatPadhi/pseudocode.js#grammar) to create psudocode, it's similar to some LaTeX algorithm packages. Additionally, inside these psudocode blocks you can use math notation available in LaTeX when enclosed like `$...$` or `\(...\)` heres an example of Quicksort, from psudocode.js
```algorithm
\begin{algorithm}
\caption{Quicksort}
\begin{algorithmic}
\PROCEDURE{Quicksort}{$A, p, r$}
    \IF{$p < r$} 
        \STATE $q = $ \CALL{Partition}{$A, p, r$}
        \STATE \CALL{Quicksort}{$A, p, q - 1$}
        \STATE \CALL{Quicksort}{$A, q + 1, r$}
    \ENDIF
\ENDPROCEDURE
\PROCEDURE{Partition}{$A, p, r$}
    \STATE $x = A[r]$
    \STATE $i = p - 1$
    \FOR{$j = p$ \TO $r - 1$}
        \IF{$A[j] < x$}
            \STATE $i = i + 1$
            \STATE exchange
            $A[i]$ with $A[j]$
        \ENDIF
        \STATE exchange $A[i]$ with $A[r]$
    \ENDFOR
\ENDPROCEDURE
\end{algorithmic}
\end{algorithm}
```

### The Repo
The layout of this repo is roughly like this
```
├── imgs
│   ├── ...
├── src
│   ├── ...
├── index.html
├── styles.css
├── script.js
├── README.md
├── makeJSON.py
├── navbar.json
```

Images go in the *imgs* directory and can be accessed in markdowns by putting their path relative to *index.html*, don't worry about where the markdown file that uses the images is located. For example,
```markdown
![CUAD Logo](imgs/logos/CUAD_Logo.png)
```
![CUAD Logo](imgs/logos/CUAD_Logo.png)


The navigation bar is determined by navbar.json, a JSON file that must match the file structure in *src*. Running *makeJSON.py* will generate a JSON or raise an error if the file structure is invalid. Since the file structure of *src* entirely determines how the navbar looks, it should be arranged as follows.
```
├── src
│   ├── category1                   <- This is a category, the bolded headers to groups of sections, it has no .md file.
│   │   ├── section1
│   │   │   ├── section1.md         <- This is the source for section1, it must match the section name.
│   │   │   ├── subsection1.1.md
│   │   │   ├── subsection1.2.md
│   │   ├── section2.md             <- This is a .md file under a category, it will become a section without subsections.
│   ├── category2
│   │   ├── section3.md
│   │   ├── section4
│   │   │   ├── section4.md
│   │   │   ├── subsection4.1.md    <- These are the subsection source files.
│   │   │   ├── subsection4.2.md    <- They will be viewed in the drop-down menu for section4.
```
The categories are the bolded header and have no associated pages. Sections and subsections are displayed below and represent viewable pages. The order of the categories, sections, and subsections is alphabetical. The best way to influence the order is by prepending the order as a number followed by a tilda **~**. See the **Name Changes** section for a full list of the changes that are made to folder/file names. To make a section with no subsections, add the markdown file directly in its category directory (like section2 or section3). If a section has subsections, it must have a markdown file in its directory, the markdown file name must be the same (after changes) as the section folder name. I suggest adding **0~** before the section name.

The reason for the annoying middle-man step of having a Python file generate the JSON is that (as far as I can tell) vanilla Javascript cannot read a local file structure. The only ways around this are
- Have the user select the folder, which obviously doesn't work for generating the navbar automatically.
- Use Node.js, which doesn't work with GitHub Pages since it's not a static website.
- Use manually entered HTML and update every time a new page is added.
- Use Python.
If you know a way around this, please change it! I'd love to see a better solution.

### Name Changes
- Everything before the first tilda **~** is discarded. This is so that numbers can be added before filenames to determine the order
- There are also a series of replacements for characters or phrases in the file/folder names, additional replacements can be added by changing *REPLACEMENTS* in *makeJSON.py*
    - '**_** is replaced with a space ' '
    - '**(star)**' is replaced with an asterisk '**\***'
    - '**(slash)**' is replaced with a forward slash '**/**'
    - '**(colon)**' is replaced with a colon '**:**'
    - '**(question)**' is replaced with a question mark '**?**'

## How to Edit
If you are only making changes to the markdown files, for example fixing a typo or adding a missing detail, clone the repo, make the change, and push your changes. Then, double-check the website, GitHub Pages updates quickly so make sure your change works and didn't break anything. Also, make sure to make a descriptive commit message like:
```
Fixed Typo and Added Detail

- Fixed typo in WSL.md, changed instally to install
- Added detail in Setting_Up.md, explained the options better
```


If you are adding a page or changing the layout, the above instructions still apply. Also, make sure you run **makeJSON.py** before pushing. It should print "**JSON Completed**" and nothing else! If there is an error, it means that the files were improperly laid out, and you will have to fix it. You should also double-check that the changes you have made created the desired effect before pushing the repo (you can use Live Server, a VS Code extension, to see it in your browser before you push).


If you have any suggestions to make the website better or easier to update, feel free to reach out!