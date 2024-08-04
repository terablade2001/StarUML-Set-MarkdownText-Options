function setDefinedMarkdownTextSize(fontSize)  {
  document.querySelectorAll('.CodeMirror').forEach(function(editor) {
    editor.style.fontSize = fontSize
  });
  // console.log("New font size set: ["+fontSize+"]")
}

function setMarkdownTextSize() {
  var currentFontSize = "default"
  document.querySelectorAll('.CodeMirror').forEach(function(editor) {
    if (editor.style.fontSize) {
      if (editor.style.fontSize != "") {
        currentFontSize = editor.style.fontSize
        currentFontSize = currentFontSize.replace("px", "")
      }
    }
  });

  app.dialogs.showInputDialog("Set Markdown Text Font Size in px (use empty for default):",""+currentFontSize).then(function ({buttonId, returnValue}) {
    if (buttonId === 'ok') {
      if ((returnValue == "") || (returnValue=="default")) {
        setDefinedMarkdownTextSize("")
        app.toast.info("Markdown font size set to it's default value")
      } else {
        if(!isNaN(Number(returnValue))) {
          setDefinedMarkdownTextSize(returnValue+'px')
          prefManager.set("SetMarkdownTextOptions::FontSize",returnValue)
          app.toast.info("Markdown font size set to: "+returnValue)
        } else {
          app.toast.error("Value ["+returnValue+"] is not a valid number.")
        }
      }
    } else {
      app.toast.warning("Set of markdown font size cancelled by the user...")
    }
  })
  return 0
}


let prefManager
function init () {
  prefManager = app.preferences
  app.commands.register('SetMarkdownTextOptions:setMarkdownTextSize', setMarkdownTextSize)
  fontSize = prefManager.get("SetMarkdownTextOptions::FontSize")
  if (fontSize) { setDefinedMarkdownTextSize(fontSize+"px") }
}

exports.init = init