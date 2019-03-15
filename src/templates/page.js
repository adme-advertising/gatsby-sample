import React from "react"
import { graphql } from "gatsby"
import UIkit from "uikit"
import axios from "axios"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import "../../node_modules/uikit/dist/css/uikit.min.css"
import "./page.css"

class Page extends React.Component {
  state = {
    title: this.props.pageContext.title,
    content: this.props.pageContext.content,
    formJSON: "",
    radioState: "",
    checkState: [],
    formID: "",
    noOfSubmissions: 0,
  }
  componentDidMount = async () => {
    await this.setState({
      formID: document.getElementsByClassName("ajax-submit")[0].id,
    })
    if (this.state.title === "Search 03") {
      document.getElementById(
        `gform_wrapper_${this.state.formID}`
      ).style.display = "block"
    }
    const hiddenElemenets = document.getElementsByClassName("hidden")
    for (let element of hiddenElemenets) {
      element.style.display = "none"
    }
    document
      .getElementById(`gform_${this.state.formID}`)
      .addEventListener("submit", e => {
        UIkit.modal("#spin", { stack: true, center: true }).show()
        const formJSON = {}
        e.preventDefault()
        const inputs = document.getElementsByClassName("input_field")
        for (let element of inputs) {
          if (element.type == "radio") {
            formJSON[element.name] = this.state.radioState
          } else {
            formJSON[element.name] = element.value
          }
        }

        axios

          .post(
            `https://staging-stie.adus.com.au/wp-json/gf/v2/forms/${
              this.state.formID
            }/submissions`,
            formJSON
          )
          .then(res => {
            let errorText = document.getElementsByClassName("errorText")
            for (let element of errorText) {
              element.style = "display: none"
            }
            let superParentDiv = document.getElementById(
              `gform_fields_${this.state.formID}`
            )
            let parentDiv = document.createElement("div")
            let node = document.createElement("span")
            let textnode = document.createTextNode(
              "Thank you for submitting this form, we will be with you shortly."
            )
            UIkit.modal.alert(
              "<p>Thank you for submitting this form, we will be with you shortly.</p>"
            )
            // node.appendChild(textnode)
            // parentDiv.appendChild(node)
            // superParentDiv.appendChild(parentDiv)
            this.setState({ noOfSubmissions: 0 })
          })
          .catch(err => {
            const positionalArray = []
            let errorText = document.getElementsByClassName("errorText")
            for (let element of errorText) {
              element.style = "display: none"
            }
            const fieldSet = document.getElementsByClassName("uk-fieldset")[0]
              .children[0].children
            for (let element of fieldSet) {
              element.classList.remove("error_class")
            }
            const entries = Object.entries(
              err.response.data.validation_messages
            )
            entries.forEach(ele => {
              let suffix = `${ele[0]}`
              let parentDiv = document.getElementById(
                `field_${this.state.formID}_${suffix}`
              )
              positionalArray.push(parentDiv)
              let node = document.createElement("span")
              let textnode = document.createTextNode(ele[1])
              node.className = "errorText"
              node.appendChild(textnode)
              parentDiv.appendChild(node)
            })

            UIkit.modal
              .alert(
                "<p>There were errors with your submission, please correct these errors.</p>"
              )
              .then(() => {
                positionalArray[0].scrollIntoView(true)
                positionalArray[0].children[1].children[0].focus()
              })
            positionalArray.forEach(ele => {
              ele.classList.add("error_class")
            })
          })
        const refreshInputs = document.getElementsByClassName("input_field")
        for (let element of refreshInputs) {
          element.value = ""
        }
      })
    const inputs = document.getElementsByClassName("input_field")
    for (let element of inputs) {
      if (element.type == "radio") {
        element.addEventListener("click", e => {
          this.setState({ radioState: e.target.value })
          if (e.target.id === `choice_${this.state.formID}_5_1`) {
            for (let element of hiddenElemenets) {
              element.style.display = "block"
            }
          } else {
            for (let element of hiddenElemenets) {
              element.style.display = "none"
            }
          }
        })
      } else {
        element.addEventListener("change", e => {
          element.value = e.target.value
        })
      }
    }
  }

  render = () => {
    return (
      <div>
        <Header />
        <div>
          <h1>{this.state.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
          <div id="spin" className="uk-flex-top" uk-modal="bg-close: false">
            <div className="uk-light uk-modal-dialog uk-modal-body spinner-transparent uk-margin-auto-vertical uk-flex uk-flex-center">
              <span uk-spinner="ratio: 5"></span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    allWordpressPage(filter: { title: { eq: $id } }) {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`

export default Page
