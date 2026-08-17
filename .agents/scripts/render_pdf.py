import fitz
doc = fitz.open("/tmp/rkt.pdf")
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2,2))
    pix.save(f".agents/outputs/rkt/page{i+1}.png")
    for j, img in enumerate(page.get_images(full=True)):
        try:
            d = doc.extract_image(img[0])
            open(f".agents/outputs/rkt/p{i+1}_img{j}.{d['ext']}","wb").write(d["image"])
        except Exception as e:
            print("skip", i+1, j, e)
print("pages:", doc.page_count)
