#!/usr/bin/env python3
"""Build PDF, DOCX, and Markdown resumes from resume/resume.json."""

from __future__ import annotations

import html
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
ROOT = Path(__file__).resolve().parents[1]
DEPS = Path("/tmp/resume-generation-deps")
if DEPS.is_dir():
    sys.path.insert(0, str(DEPS))

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer


INPUT = ROOT / "resume" / "resume.json"
PDF_OUTPUT = ROOT / "public" / "Resume.pdf"
DOCX_OUTPUT = ROOT / "resume" / "Anthony_Mendoza_Resume.docx"
MD_OUTPUT = ROOT / "resume" / "Anthony_Mendoza_Resume.md"


def require(value: Any, kind: type, where: str) -> Any:
    if not isinstance(value, kind):
        raise ValueError(f"{where} must be {kind.__name__}")
    return value


def validate(data: Any) -> dict[str, Any]:
    require(data, dict, "resume")
    for key in ("name", "headline", "summary"):
        require(data.get(key), str, key)
    for key in ("contact", "experience", "projects", "skills"):
        require(data.get(key), list, key)
    require(data.get("education"), dict, "education")
    for i, item in enumerate(data["contact"]):
        require(item, dict, f"contact[{i}]")
        require(item.get("text"), str, f"contact[{i}].text")
        if "href" in item:
            require(item["href"], str, f"contact[{i}].href")
    for i, item in enumerate(data["experience"]):
        require(item, dict, f"experience[{i}]")
        for key in ("company", "title", "location", "dates"):
            require(item.get(key), str, f"experience[{i}].{key}")
        require(item.get("bullets"), list, f"experience[{i}].bullets")
        for j, bullet in enumerate(item["bullets"]):
            require(bullet, str, f"experience[{i}].bullets[{j}]")
    for i, item in enumerate(data["projects"]):
        require(item, dict, f"projects[{i}]")
        for key in ("name", "url"):
            require(item.get(key), str, f"projects[{i}].{key}")
        require(item.get("stack"), list, f"projects[{i}].stack")
        require(item.get("bullets"), list, f"projects[{i}].bullets")
        for key in ("stack", "bullets"):
            for j, value in enumerate(item[key]):
                require(value, str, f"projects[{i}].{key}[{j}]")
    for i, item in enumerate(data["skills"]):
        require(item, dict, f"skills[{i}]")
        require(item.get("label"), str, f"skills[{i}].label")
        require(item.get("items"), list, f"skills[{i}].items")
        for j, value in enumerate(item["items"]):
            require(value, str, f"skills[{i}].items[{j}]")
    for key in ("school", "location", "degree", "dates"):
        require(data["education"].get(key), str, f"education.{key}")
    return data


def link_markup(label: str, href: str | None = None) -> str:
    text = html.escape(label)
    if not href:
        return text
    return f'<link href="{html.escape(href, quote=True)}" color="#1769aa"><u>{text}</u></link>'


def build_pdf(data: dict[str, Any]) -> None:
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name="ResumeName", fontName="Helvetica-Bold", fontSize=22, leading=24,
        textColor=colors.HexColor("#172b4d"), spaceAfter=1,
    ))
    styles.add(ParagraphStyle(
        name="ResumeHeadline", fontName="Helvetica", fontSize=11, leading=13,
        textColor=colors.HexColor("#394b59"), spaceAfter=3,
    ))
    styles.add(ParagraphStyle(
        name="ResumeContact", fontName="Helvetica", fontSize=10.5, leading=13,
        textColor=colors.HexColor("#263746"), spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="ResumeSection", fontName="Helvetica-Bold", fontSize=11.5, leading=13,
        textColor=colors.HexColor("#172b4d"), spaceBefore=5, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        name="ResumeBody", fontName="Helvetica", fontSize=10.5, leading=12.5,
        textColor=colors.HexColor("#182b3a"), spaceAfter=1.5,
    ))
    styles.add(ParagraphStyle(
        name="ResumeBullet", parent=styles["ResumeBody"], leftIndent=12,
        firstLineIndent=-8, bulletIndent=0, spaceAfter=1,
    ))
    styles.add(ParagraphStyle(
        name="ResumeSkills", parent=styles["ResumeBody"], spaceAfter=1,
    ))

    story: list[Any] = [Paragraph(html.escape(data["name"]), styles["ResumeName"])]
    story.append(Paragraph(html.escape(data["headline"]), styles["ResumeHeadline"]))
    contacts = [link_markup(item["text"], item.get("href")) for item in data["contact"]]
    if contacts:
        contact_text = " &nbsp;|&nbsp; ".join(contacts[:3])
        if len(contacts) > 3:
            contact_text += "<br/>" + " &nbsp;|&nbsp; ".join(contacts[3:])
        story.append(Paragraph(contact_text, styles["ResumeContact"]))

    def section(title: str) -> None:
        story.append(Paragraph(title, styles["ResumeSection"]))
        story.append(HRFlowable(width="100%", thickness=0.45, color=colors.HexColor("#aab7c4"),
                                spaceBefore=0, spaceAfter=3))

    section("Summary")
    story.append(Paragraph(html.escape(data["summary"]), styles["ResumeBody"]))

    section("Experience")
    for index, job in enumerate(data["experience"]):
        if index == 1:
            story.append(Spacer(1, 3))
        story.append(Paragraph(
            f"<b>{html.escape(job['company'])}</b> &nbsp;|&nbsp; {html.escape(job['location'])}",
            styles["ResumeBody"],
        ))
        story.append(Paragraph(
            f"{html.escape(job['title'])} &nbsp;|&nbsp; {html.escape(job['dates'])}",
            styles["ResumeBody"],
        ))
        for bullet in job["bullets"]:
            story.append(Paragraph(f"- &nbsp;{html.escape(bullet)}", styles["ResumeBullet"]))

    section("Selected Projects")
    for index, project in enumerate(data["projects"]):
        if index == 1:
            story.append(Spacer(1, 3))
        stack = ", ".join(html.escape(item) for item in project["stack"])
        title = link_markup(project["name"], project["url"])
        suffix = f" &nbsp;|&nbsp; {stack}" if stack else ""
        story.append(Paragraph(f"<b>{title}</b>{suffix}", styles["ResumeBody"]))
        for bullet in project["bullets"]:
            story.append(Paragraph(f"- &nbsp;{html.escape(bullet)}", styles["ResumeBullet"]))

    section("Technical Skills")
    for group in data["skills"]:
        items = ", ".join(html.escape(item) for item in group["items"])
        story.append(Paragraph(f"<b>{html.escape(group['label'])}:</b> {items}", styles["ResumeSkills"]))

    section("Education")
    education = data["education"]
    story.append(Paragraph(
        f"<b>{html.escape(education['school'])}</b> &nbsp;|&nbsp; {html.escape(education['location'])}",
        styles["ResumeBody"],
    ))
    story.append(Paragraph(
        f"{html.escape(education['degree'])} &nbsp;|&nbsp; {html.escape(education['dates'])}",
        styles["ResumeBody"],
    ))

    PDF_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(PDF_OUTPUT), pagesize=letter, leftMargin=0.58 * inch, rightMargin=0.58 * inch,
        topMargin=0.48 * inch, bottomMargin=0.48 * inch,
        title=f"{data['name']} Resume", author=data["name"],
    )
    doc.build(story)


def xml_escape(value: str) -> str:
    return (value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            .replace('"', "&quot;").replace("'", "&apos;"))


def docx_run(text: str, *, size: int = 21, bold: bool = False,
             italic: bool = False, color: str = "182B3A",
             underline: bool = False) -> str:
    properties = (
        '<w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="Arial" w:cs="Arial"/>'
        f'<w:sz w:val="{size}"/><w:color w:val="{color}"/>'
        f'{"<w:b/>" if bold else ""}{"<w:i/>" if italic else ""}'
        f'{"<w:u w:val=\"single\"/>" if underline else ""}</w:rPr>'
    )
    return f'<w:r>{properties}<w:t xml:space="preserve">{xml_escape(text)}</w:t></w:r>'


def docx_paragraph(content: str = "", *, before: int = 0, after: int = 20,
                   line: int = 260, left: int = 0, hanging: int | None = None,
                   border: bool = False) -> str:
    indent = f'<w:ind w:left="{left}"' + (f' w:hanging="{hanging}"' if hanging is not None else "") + "/>" if left else ""
    p_border = (
        '<w:pBdr><w:bottom w:val="single" w:sz="4" w:space="2" w:color="AAB7C4"/></w:pBdr>'
        if border else ""
    )
    properties = (
        f'<w:pPr><w:pStyle w:val="Normal"/><w:spacing w:before="{before}" '
        f'w:after="{after}" w:line="{line}" w:lineRule="exact"/>{indent}{p_border}</w:pPr>'
    )
    return f"<w:p>{properties}{content}</w:p>"


def docx_hyperlink(label: str, href: str, relationships: list[str]) -> str:
    rid = f"rId{len(relationships) + 2}"
    relationships.append(
        f'<Relationship Id="{rid}" Type="{R_NS}/hyperlink" '
        f'Target="{xml_escape(href)}" TargetMode="External"/>'
    )
    return f'<w:hyperlink r:id="{rid}">{docx_run(label, color="1769AA", underline=True)}</w:hyperlink>'


def crc32(data: bytes) -> int:
    value = 0xFFFFFFFF
    for byte in data:
        value ^= byte
        for _ in range(8):
            value = (value >> 1) ^ (0xEDB88320 if value & 1 else 0)
    return value ^ 0xFFFFFFFF


def zip_u16(value: int) -> bytes:
    return value.to_bytes(2, "little")


def zip_u32(value: int) -> bytes:
    return value.to_bytes(4, "little")


def write_stored_zip(path: Path, parts: dict[str, bytes]) -> None:
    now = datetime.now(timezone.utc)
    dos_time = (now.hour << 11) | (now.minute << 5) | (now.second // 2)
    dos_date = ((now.year - 1980) << 9) | (now.month << 5) | now.day
    output = bytearray()
    central: list[bytes] = []
    for name, content in parts.items():
        filename = name.encode("utf-8")
        checksum = crc32(content)
        offset = len(output)
        output.extend(b"PK\x03\x04")
        output.extend(zip_u16(20) + zip_u16(0) + zip_u16(0))
        output.extend(zip_u16(dos_time) + zip_u16(dos_date))
        output.extend(zip_u32(checksum) + zip_u32(len(content)) + zip_u32(len(content)))
        output.extend(zip_u16(len(filename)) + zip_u16(0) + filename)
        output.extend(content)
        record = bytearray(b"PK\x01\x02")
        record.extend(zip_u16(20) + zip_u16(20) + zip_u16(0) + zip_u16(0))
        record.extend(zip_u16(dos_time) + zip_u16(dos_date))
        record.extend(zip_u32(checksum) + zip_u32(len(content)) + zip_u32(len(content)))
        record.extend(zip_u16(len(filename)) + zip_u16(0) + zip_u16(0))
        record.extend(zip_u16(0) + zip_u16(0) + zip_u32(0) + zip_u32(offset))
        record.extend(filename)
        central.append(bytes(record))
    central_offset = len(output)
    for record in central:
        output.extend(record)
    central_size = len(output) - central_offset
    output.extend(b"PK\x05\x06")
    output.extend(zip_u16(0) + zip_u16(0) + zip_u16(len(central)) + zip_u16(len(central)))
    output.extend(zip_u32(central_size) + zip_u32(central_offset) + zip_u16(0))
    path.write_bytes(output)


def build_docx(data: dict[str, Any]) -> None:
    hyperlinks: list[str] = []
    body: list[str] = [
        docx_paragraph(docx_run(data["name"], size=44, bold=True, color="172B4D"), after=20, line=480),
        docx_paragraph(docx_run(data["headline"], size=22, color="394B59"), after=40),
    ]
    contact_groups = (data["contact"][:3], data["contact"][3:])
    for index, group in enumerate(contact_groups):
        if not group:
            continue
        contacts: list[str] = []
        for item_index, item in enumerate(group):
            if item_index:
                contacts.append(docx_run("  |  "))
            contacts.append(
                docx_hyperlink(item["text"], item["href"], hyperlinks)
                if item.get("href") else docx_run(item["text"])
            )
        body.append(docx_paragraph("".join(contacts), after=100 if index == len(contact_groups) - 1 else 0))

    def add_section(title: str) -> None:
        body.append(docx_paragraph(
            docx_run(title, size=23, bold=True, color="172B4D"),
            before=100, after=50, line=280, border=True,
        ))

    def add_bullet(text: str) -> None:
        body.append(docx_paragraph(docx_run(f"-  {text}"), after=20, left=300, hanging=180))

    add_section("Summary")
    body.append(docx_paragraph(docx_run(data["summary"])))
    add_section("Experience")
    for index, job in enumerate(data["experience"]):
        body.append(docx_paragraph(
            docx_run(job["company"], bold=True) + docx_run(f"  |  {job['location']}"),
            before=60 if index == 1 else 0, after=0,
        ))
        body.append(docx_paragraph(
            docx_run(f"{job['title']}  |  {job['dates']}", italic=True), after=0,
        ))
        for bullet in job["bullets"]:
            add_bullet(bullet)

    add_section("Selected Projects")
    for index, project in enumerate(data["projects"]):
        title = docx_hyperlink(project["name"], project["url"], hyperlinks)
        if project["stack"]:
            title += docx_run("  |  " + ", ".join(project["stack"]))
        body.append(docx_paragraph(title, before=60 if index == 1 else 0, after=0))
        for bullet in project["bullets"]:
            add_bullet(bullet)

    add_section("Technical Skills")
    for group in data["skills"]:
        body.append(docx_paragraph(
            docx_run(f"{group['label']}: ", bold=True) + docx_run(", ".join(group["items"])),
        ))

    add_section("Education")
    education = data["education"]
    body.append(docx_paragraph(
        docx_run(education["school"], bold=True) + docx_run(f"  |  {education['location']}"), after=0,
    ))
    body.append(docx_paragraph(
        docx_run(f"{education['degree']}  |  {education['dates']}", italic=True),
    ))

    document = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        '<w:body>' + "".join(body) +
        '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/>'
        '<w:pgMar w:top="691" w:right="835" w:bottom="691" w:left="835" '
        'w:header="0" w:footer="0" w:gutter="0"/></w:sectPr></w:body></w:document>'
    )
    styles = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>'
        '<w:sz w:val="21"/></w:rPr></w:rPrDefault>'
        '<w:pPrDefault><w:pPr><w:spacing w:after="20" w:line="260" w:lineRule="exact"/>'
        '</w:pPr></w:pPrDefault></w:docDefaults>'
        '<w:style w:type="paragraph" w:default="1" w:styleId="Normal">'
        '<w:name w:val="Normal"/></w:style></w:styles>'
    )
    doc_rels = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        f'<Relationship Id="rId1" Type="{R_NS}/styles" Target="styles.xml"/>'
        + "".join(hyperlinks) + "</Relationships>"
    )
    root_rels = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        f'<Relationship Id="rId1" Type="{R_NS}/officeDocument" Target="word/document.xml"/>'
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>'
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>'
        "</Relationships>"
    )
    content_types = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
        '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'
        '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>'
        '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>'
        "</Types>"
    )
    timestamp = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    name = xml_escape(data["name"])
    core = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
        'xmlns:dc="http://purl.org/dc/elements/1.1/" '
        'xmlns:dcterms="http://purl.org/dc/terms/" '
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        f'<dc:title>{name} Resume</dc:title><dc:creator>{name}</dc:creator>'
        f'<cp:lastModifiedBy>{name}</cp:lastModifiedBy>'
        f'<dcterms:created xsi:type="dcterms:W3CDTF">{timestamp}</dcterms:created>'
        f'<dcterms:modified xsi:type="dcterms:W3CDTF">{timestamp}</dcterms:modified>'
        "</cp:coreProperties>"
    )
    app_ns = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
    app = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<Properties xmlns="{app_ns}"><Application>Microsoft Word</Application></Properties>'
    )
    parts = {
        "[Content_Types].xml": content_types.encode("utf-8"),
        "_rels/.rels": root_rels.encode("utf-8"),
        "docProps/core.xml": core.encode("utf-8"),
        "docProps/app.xml": app.encode("utf-8"),
        "word/document.xml": document.encode("utf-8"),
        "word/styles.xml": styles.encode("utf-8"),
        "word/_rels/document.xml.rels": doc_rels.encode("utf-8"),
    }
    DOCX_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    write_stored_zip(DOCX_OUTPUT, parts)


def markdown(data: dict[str, Any]) -> str:
    lines = [f"# {data['name']}", "", data["headline"], ""]
    lines.append(" | ".join(
        f"[{item['text']}]({item['href']})" if item.get("href") else item["text"]
        for item in data["contact"]
    ))
    lines.extend(["", "## Summary", "", data["summary"], "", "## Experience", ""])
    for job in data["experience"]:
        lines.extend([f"**{job['company']}** | {job['location']}", f"{job['title']} | {job['dates']}"])
        lines.extend(f"- {bullet}" for bullet in job["bullets"])
        lines.append("")
    lines.extend(["## Selected Projects", ""])
    for project in data["projects"]:
        title = f"[{project['name']}]({project['url']})"
        if project["stack"]:
            title += " | " + ", ".join(project["stack"])
        lines.append(title)
        lines.extend(f"- {bullet}" for bullet in project["bullets"])
        lines.append("")
    lines.extend(["## Technical Skills", ""])
    lines.extend(f"**{group['label']}:** {', '.join(group['items'])}" for group in data["skills"])
    education = data["education"]
    lines.extend([
        "", "## Education", "", f"**{education['school']}** | {education['location']}",
        f"{education['degree']} | {education['dates']}", "",
    ])
    return "\n".join(lines)


def main() -> None:
    if not INPUT.is_file():
        raise SystemExit(f"Missing input file: {INPUT}")
    try:
        data = validate(json.loads(INPUT.read_text(encoding="utf-8")))
    except (json.JSONDecodeError, ValueError) as error:
        raise SystemExit(f"Invalid resume data: {error}") from error
    build_pdf(data)
    MD_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    MD_OUTPUT.write_text(markdown(data), encoding="utf-8")
    build_docx(data)
    print(f"Built {PDF_OUTPUT.relative_to(ROOT)}, {DOCX_OUTPUT.relative_to(ROOT)}, and {MD_OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
