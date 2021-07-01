test(() => {
  assert_true('pdfViewerEnabled' in navigator, "property exists");
  assert_true(navigator.pdfViewerEnabled === true || navigator.pdfViewerEnabled === false, "property is boolean");
}, "navigator.pdfViewerEnabled exists");

const pluginNames = [
  "PDF Viewer",
  "Chrome PDF Viewer",
  "Chromium PDF Viewer",
  "Microsoft Edge PDF Viewer",
  "WebKit built-in PDF"
];

const mimeTypes = [
  "application/pdf",
  "text/pdf"
];

if (navigator.pdfViewerEnabled) {
  test(() => {
    assert_equals(navigator.mimeTypes.length, mimeTypes.length, "length");

    for (let i = 0; i < mimeTypes.length; ++i) {
      const mimeType = mimeTypes[i];
      const mimeTypeObject = navigator.mimeTypes.item(i);

      assert_equals(mimeTypeObject.type, mimeType, `${i}th type`);
      assert_equals(mimeTypeObject.description, "Portable Document Format", `${i}th description`);
      assert_equals(mimeTypeObject.suffixes, "pdf", `${i}th suffixes`);
      assert_equals(mimeTypeObject, navigator.mimeTypes.namedItem(mimeType), `mimeTypes.item(${i}) matches namedItem("${mimeType}")`);
      assert_equals(mimeTypeObject.enabledPlugin, navigator.plugins[0], `${i}th enabledPlugin matches 0th Plugin`)
    }
  }, "navigator.mimeTypes contains the hard-coded list");

  test(() => {
    assert_equals(navigator.plugins.length, pluginNames.length, "length");

    for (let i = 0; i < pluginNames.length; ++i) {
      const pluginName = pluginNames[i];
      const pluginObject = navigator.plugins.item(i);

      assert_equals(pluginObject.name, pluginName, `${i}th name`);
      assert_equals(pluginObject.description, "Portable Document Format", `${i}th description`);
      assert_equals(pluginObject.filename, "internal-pdf-viewer", `${i}th filename`);
      assert_equals(pluginObject, navigator.plugins.namedItem(pluginName), `plugins.item(${i}) matches namedItem("${pluginName}")`);

      for (let j = 0; j < mimeTypes.length; ++j) {
        const mimeType = mimeTypes[j];
        assert_equals(pluginObject.item(j), navigator.mimeTypes.item(j), `item(${j}) on the Plugin`);
        assert_equals(pluginObject.namedItem(mimeType), navigator.mimeTypes.item(j), `namedItem("${mimeType}") on the Plugin`);
      }
    }
  }, "navigator.plugins contains the hard-coded list");
} else {
  test(() => {
    assert_equals(navigator.mimeTypes.length, 0, "length");
    assert_equals(navigator.mimeTypes.item(0), null, "item");

    for (const mimeType of mimeTypes) {
      assert_equals(navigator.mimeTypes.namedItem(mimeType), null, `namedItem("${mimeType}")`);
    }
  }, "navigator.mimeTypes is empty");

  test(() => {
    assert_equals(navigator.plugins.length, 0, "length");
    assert_equals(navigator.plugins.item(0), null, "item");

    for (const pluginName of pluginNames) {
      assert_equals(navigator.plugins.namedItem(pluginName), null, `namedItem("${pluginName}")`);
    }
  }, "navigator.plugins is empty");
}
