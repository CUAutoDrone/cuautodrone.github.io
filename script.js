const slide_speed = 200
const options = {
    throwOnError: false
};
marked.use(markedKatex(options));
displayMd('README.md')

fetch('navbar.json')
    .then(response => response.json())
    .then(response => makeCategories(response))
    .catch(error => {
        console.error('Error:', error);
    });
// prepareDocs()

function makeCategories(json) {
    var categories = document.createElement('ul')
    categories.setAttribute('class', 'categories')
    json.forEach(json => {
        if (json.type != 'category') return
        var category = document.createElement('span')
        category.setAttribute('class', 'category-name')
        category.textContent = json.name
        categories.appendChild(category)


        var sections = document.createElement('ul')
        sections.setAttribute('class', 'sections')
        json.children.forEach(element => sections.appendChild(makeSection(element)))

        categories.appendChild(sections)
    })

    document.getElementById('sidebar').appendChild(categories)
    prepareDocs()

}

function makeSection(json) {
    if (json.type != 'section') return
    var section = document.createElement('li');
    section.setAttribute('class', 'section');

    var sectionName = document.createElement('span');
    sectionName.textContent = json.name;
    sectionName.setAttribute('class', 'section-name');
    sectionName.setAttribute('href', json.path);

    section.appendChild(sectionName);

    if (json.children.length > 0) {
        var showSubsections = document.createElement('button');
        showSubsections.setAttribute('class', 'show-subsections')
        var buttonText = document.createElement('span')
        buttonText.setAttribute('class', 'icon')
        buttonText.textContent = '▼';
        showSubsections.appendChild(buttonText);
        section.appendChild(showSubsections);

        var subsections = document.createElement('ul');
        subsections.setAttribute('class', 'subsections')
        json.children.forEach(element => subsections.appendChild(makeSubsection(element)))
        section.appendChild(subsections)
    }

    return section
}

function makeSubsection(json) {
    if (json.type != 'subsection') return
    var subsection = document.createElement('li');
    subsection.setAttribute('class', 'subsection');
    var subsectionContent = document.createElement('a');
    subsectionContent.textContent = json.name;
    subsectionContent.setAttribute('href', json.path);
    subsection.appendChild(subsectionContent);
    return subsection
}

function displayMd(md) {
    scrollTo(0, 0);
    fetch(md)
        .then(response => response.text())
        .then(markdownContent => {
            const markdownContainer = document.getElementById('markdown');
            const htmlContent = marked(markdownContent);
            markdownContainer.innerHTML = htmlContent;
            Prism.highlightAll();

            const codeBlocks = markdownContainer.querySelectorAll('pre > code');
            codeBlocks.forEach((codeBlock) => {
                if (!codeBlock.getAttribute('class')) return
                if (codeBlock.getAttribute('class') == "language-{algorithm} language-none") {
                    pseudocode.renderElement(codeBlock, { lineNumber: true, lineNumberPunc: ' ' });
                    return
                }
                const copyIcon = document.createElement('span');
                copyIcon.className = 'copy-icon material-icons';
                copyIcon.textContent = 'content_copy';
                const codeContainer = codeBlock.parentNode;
                codeContainer.style.position = 'relative';
                copyIcon.addEventListener('click', () => {
                    copyCodeBlock(codeBlock, copyIcon);
                });
                codeContainer.appendChild(copyIcon);
            });
            var algorithms = document.querySelectorAll('.ps-algorithm.with-caption > .ps-line:first-child > .ps-keyword');
            algorithms.forEach(function (algorithm) {
                algorithm.remove()
            });

            const paragraphs = document.querySelectorAll('p:not([class])');
            paragraphs.forEach(paragraph => {
                const katexSpans = paragraph.querySelectorAll('span.katex');
                katexSpans.forEach(katexSpan => {
                    const next = katexSpan.nextSibling;
                    if (next && next.nodeType === Node.TEXT_NODE) {
                        const punctuation = ['.', ',', '\'', '"', ';', ')', '?', '!', ']', '-']
                        if (next.textContent[0] == ' ' && punctuation.includes(next.textContent[1])) {
                            next.textContent = next.textContent.slice(1)
                        }
                    }
                });
            });
        });
}

function copyCodeBlock(codeBlock, copyIcon) {
    const codeText = codeBlock.innerText;
    navigator.clipboard.writeText(codeText)

    copyIcon.textContent = 'done';
    copyIcon.className = 'copy-icon checkmark'

    setTimeout(() => {
        copyIcon.textContent = 'content_copy';
        copyIcon.className = 'copy-icon'
    }, 2000);
}


function prepareDocs() {
    $('.subsections').hide();

    $('.show-subsections').click(function () {
        var subsections = $(this).siblings('.subsections');
        subsections.slideToggle(slide_speed);

        var icon = $(this).find('.icon');
        icon.toggleClass('rotate-icon');
        icon.text(icon.hasClass('rotate-icon') ? '▲' : '▼');
    });

    $('.section-name').click(function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        displayMd(href);

        var clickedSection = $(this).closest('.section');
        var clickedSubsections = clickedSection.find('.subsections');
        var otherSubsections = $('.subsections').not(clickedSubsections);
        otherSubsections.slideUp(slide_speed);

        var clickedIcon = clickedSection.find('.show-subsections .icon');
        var otherIcons = $('.show-subsections .icon').not(clickedIcon);
        otherIcons.removeClass('rotate-icon').text('▼');

        clickedSubsections.slideDown(slide_speed);
        clickedIcon.addClass('rotate-icon').text('▲');

        $('.section-name, .subsection a').removeClass('selected');
        $(this).addClass('selected');
        clickedSection.find('.subsection a').removeClass('selected');
    });

    $('.subsection a').click(function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        displayMd(href);

        var clickedSubsection = $(this);
        var clickedSection = clickedSubsection.closest('.section');

        $('.section-name, .subsection a').removeClass('selected');
        clickedSubsection.addClass('selected');
        clickedSection.find('.section-name').addClass('selected');
    });

    $('.section').each(function () {
        var subsections = $(this).find('.subsections');
        var icon = $(this).find('.show-subsections .icon');

        if (subsections.is(':visible')) {
            icon.addClass('rotate-icon').text('▲');
        } else {
            icon.text('▼');
        }
    });
}
