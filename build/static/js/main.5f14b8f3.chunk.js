(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{17:function(e,t,n){e.exports=n(40)},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var r=n(16),a=n(2),s=n(15),u=n.n(s),o=n(0),c=n.n(o),l=n(4),i=n.n(l),m="https://lit-beach-60745.herokuapp.com/api/persons",d=function(){return i.a.get(m).then((function(e){return e.data}))},f=function(e){return i.a.post(m,e).then((function(e){return e.data}))},E=function(e){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},h=function(e,t){return i.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data}))},b=(n(39),function(e){var t=e.persons,n=e.setPersonsShow,r=Object(o.useState)(""),s=Object(a.a)(r,2),u=s[0],l=s[1];return c.a.createElement("div",null,"filter show with",c.a.createElement("input",{value:u,onChange:function(e){var r=t.filter((function(t){return t.name.toLowerCase().includes(e.target.value)}));l(e.target.value),n(r)}}))}),p=function(e){var t=e.persons,n=e.setPersons,s=e.setPersonsShow,u=e.setAddMessage,l=e.setErrorMessage,i=Object(o.useState)(""),m=Object(a.a)(i,2),d=m[0],E=m[1],b=Object(o.useState)(""),p=Object(a.a)(b,2),g=p[0],v=p[1];return c.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a={name:d,number:g,id:Math.floor(Math.random()*Number.MAX_SAFE_INTEGER)},o=t.filter((function(e){return e.name===d}));if(0!==o.length){if(window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one?"))){var c=function(e,t,n){var a=Object(r.a)(e),s=a.findIndex((function(e){return e.id===t}));return a[s].number=n,a}(t,o[0].id,a.number);n(c),s(c),h(o[0].id,a).then((function(){return u("Update sucessfully")})).catch((function(){l("Update fail"),setTimeout((function(){return l(null)}),5e3)}))}}else""===d&&""===g||(f(a).then((function(e){a.id=e.id,u("Added ".concat(d)),setTimeout((function(){return u(null)}),5e3)})).catch((function(){l("Post fail"),setTimeout((function(){return l(null)}),5e3)})),n(t.concat(a)));E(""),v("")}},c.a.createElement("table",null,c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("td",null,"name:"),c.a.createElement("td",null,c.a.createElement("input",{value:d,onChange:function(e){return E(e.target.value)}}))),c.a.createElement("tr",null,c.a.createElement("td",null,"number:"),c.a.createElement("td",null,c.a.createElement("input",{value:g,onChange:function(e){return v(e.target.value)}}))))),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"add")))},g=function(e){var t=e.person,n=e.persons,r=e.setPersons,a=e.setPersonsShow,s=e.setAddMessage,u=e.setErrorMessage;return c.a.createElement("tr",null,c.a.createElement("td",null,t.name),c.a.createElement("td",null,t.number),c.a.createElement("td",null,c.a.createElement("button",{onClick:function(){var e=n.filter((function(e){return e.id!==t.id}));r(e),a(e),E(t.id).then((function(){return s("Delete sucessfully")})).catch((function(){u("Information of ".concat(t.name," has already beed removed from server")),setTimeout((function(){return u(null)}),5e3)}))}},"delete")))},v=function(e){var t=e.persons,n=e.setPersons,r=e.setPersonsShow,a=e.personsShow,s=e.setAddMessage,u=e.setErrorMessage;return c.a.createElement("table",null,c.a.createElement("tbody",null,a.map((function(e){return c.a.createElement(g,{key:e.id,person:e,persons:t,setPersons:n,setPersonsShow:r,setAddMessage:s,setErrorMessage:u})}))))},w=function(e){var t=e.message,n=e.className;return null===t?null:c.a.createElement("div",null,c.a.createElement("p",{className:n},t))},S=function(){var e=Object(o.useState)([]),t=Object(a.a)(e,2),n=t[0],r=t[1],s=Object(o.useState)(n),u=Object(a.a)(s,2),l=u[0],i=u[1],m=Object(o.useState)(null),f=Object(a.a)(m,2),E=f[0],h=f[1],g=Object(o.useState)(null),S=Object(a.a)(g,2),j=S[0],M=S[1];return Object(o.useEffect)((function(){d().then((function(e){return r(e)})).catch((function(){M("Get data fail from the server"),setTimeout((function(){return M(null)}),5e3)}))}),[]),Object(o.useEffect)((function(){return i(n)}),[n]),c.a.createElement("div",null,c.a.createElement("h2",null,"Phonebook"),c.a.createElement(w,{message:E,className:"message"}),c.a.createElement(w,{message:j,className:"error"}),c.a.createElement(b,{persons:n,setPersonsShow:i,setErrorMessage:M}),c.a.createElement("h3",null,"Add a new"),c.a.createElement(p,{persons:n,setPersons:r,setPersonsShow:i,addMessage:E,setAddMessage:h,setErrorMessage:M}),c.a.createElement("h3",null,"Numbers"),c.a.createElement(v,{persons:n,setPersons:r,personsShow:l,setPersonsShow:i,setAddMessage:h,setErrorMessage:M}))};u.a.render(c.a.createElement(S,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.5f14b8f3.chunk.js.map