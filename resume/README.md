# Resume

`resume.json` is the editable source for the full-stack software engineer resume. AI automation is a supporting specialty. Company work appears under Experience; Selected Projects covers two independent builds.

Generated files:

- `../public/Resume.pdf` — the portfolio's existing resume download.
- `Anthony_Mendoza_Resume.docx` — an editable version for applications requesting Word documents.
- `Anthony_Mendoza_Resume.md` — a readable text version.

Rebuild from the repository root:

```sh
python3 -m pip install --target /tmp/resume-generation-deps -r scripts/requirements-resume.txt
python3 scripts/build_resume.py
```

Review the PDF visually and check its extracted text after changing the content. Tailor the summary, skill ordering, and selected examples to a specific job description while keeping the claims factual.

## Fact checks

- Graduation: May 2026, confirmed by Anthony during this revision.
- Lifewood: explicitly an internship, June–December 2025, confirmed by Anthony during this revision.
- GitHub: 137 merged pull requests authored by `hakdogins27` across six accessible Momentum repositories, checked on October 22, 2026. This count excludes direct commits and unmerged work.
- The callback-detection improvement from 60 to 10 seconds is retained from the previous PDF.
- Historical signup, outreach, email, and test counts were omitted because they were not reverified for this revision.

This layout is designed for straightforward text extraction. Actual application results depend on the job requirements and the employer's process; it has not been submitted to an employer's ATS for validation.
