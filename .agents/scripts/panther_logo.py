import pymupdf
doc = pymupdf.open("attached_assets/PANTHER_BRANDBOOK_2025_1786979916989.pdf")
p = doc[6]
clip = pymupdf.Rect(330, 360, 1600, 730)
pix = p.get_pixmap(matrix=pymupdf.Matrix(2,2), clip=clip)
pix.save("artifacts/inscricao-v3/src/assets/brand/panther-main.png")
print(pix.width, pix.height)
