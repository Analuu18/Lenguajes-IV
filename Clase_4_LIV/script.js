const blob = new Blob(["lorem ipsum dolor sit amet consectetur adipiscing elit "], { type: "text/plain" });

const url = URL.createObjectURL(blob);
const a = document.createElement("a");
    a.href = url;
    a.download = "archivo.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

const sliceButton = document.getElementById("Slice");
sliceButton.addEventListener("click", function() {
    var slicedBlob = blob.slice(0, 10);
    var url = URL.createObjectURL(slicedBlob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "archivo_slice.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
);
