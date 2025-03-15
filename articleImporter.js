export async function loadArticle() {
    const response = await fetch(window.txt_add);
    const text = await response.text();
    const lines = text.split('\n');
    let footnoteIndex = 1;
    let footnotes = [];
    let toc = [];
    let content = "";
    
    function extractFootnotes(txt_l, currentIndex) {
    txt_l = txt_l.split("$");
    let flag = 1;
    let ftxt = "";
    let newFootnotes = [];  // Use a new array

    for (let i = 0; i < txt_l.length; i++) {
        if (flag === 0) {
            const footnoteId = "footnote-" + currentIndex;
            newFootnotes.push(`<div id="${footnoteId}" onclick="selectFootnote('${footnoteId}')">${currentIndex}. ${txt_l[i]}</div>`);
            ftxt += `<sup id="f-${currentIndex}" onclick="scrollToFootnote('${footnoteId}')">[${currentIndex++}]</sup>`;
            flag = 1;
        } else {
            ftxt += txt_l[i];
            flag = 0;
        }
    }
    return [ftxt, newFootnotes, currentIndex];  // Ensure an array is returned
}

    lines.forEach((line, i) => {
        if (line.startsWith("#")) {
            const level = line.match(/^#+/)[0].length;
            const id = "headline-" + i;
            toc.push(`<li class="level-${level}"><a href="#${id}">${line.replaceAll("#", "")}</a></li>`);
            content += `<h${level} id="${id}">${line.replace(/^#+/, "").trim()}</h${level}>`;
        } else {
            let extractionOutput = extractFootnotes(line, footnoteIndex);
            content += `<p>${extractionOutput[0]}</p>`;
            footnotes = footnotes.concat(extractionOutput[1]);
            footnoteIndex = extractionOutput[2];
        }
    });

    document.getElementById("main").innerHTML = content;
    document.getElementById("footnotes").innerHTML = footnotes.join("\n");
    document.getElementById("toc").innerHTML = `<ul>${toc.join("\n")}</ul>`;
}

export function scrollToFootnote(id) {
    selectFootnote(id);
    const note = document.getElementById(id);
    if (note) {
        const ref = document.getElementById("f-" + id.split("-").slice(-1));
        const offset = note.offsetTop + document.getElementById("main").scrollTop - ref.offsetTop - ref.parentNode.offsetTop;
        document.getElementById("footnotes").scrollTop = offset;
    }
}

export function selectFootnote(id) {
    document.querySelectorAll("#footnotes div").forEach(div => div.classList.remove("selected"));
    const note = document.getElementById(id);
    if (note) {
        note.classList.add("selected");
    }
}
