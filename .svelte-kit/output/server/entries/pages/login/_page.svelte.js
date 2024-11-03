import { c as create_ssr_component, d as compute_rest_props, f as spread, h as escape_attribute_value, i as escape_object, j as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { c as cn, B as Button } from "../../../chunks/index2.js";
import "../../../chunks/supabase.js";
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  return `<input${spread(
    [
      {
        class: escape_attribute_value(cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("value", value, 0)}>`;
});
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("rounded-lg border bg-card text-card-foreground shadow-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("p-6 pt-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<p${spread(
    [
      {
        class: escape_attribute_value(cn("text-sm text-muted-foreground", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</p>`;
});
const Card_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-1.5 p-6", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "tag"]);
  let { class: className = void 0 } = $$props;
  let { tag = "h3" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        {
          class: escape_attribute_value(cn("text-2xl font-semibold leading-none tracking-tight", className))
        },
        escape_object($$restProps)
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<label${spread(
    [
      {
        class: escape_attribute_value(cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</label>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let loading = false;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="container flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center">${validate_component(Card, "Card").$$render($$result, { class: "w-full max-w-lg" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "CardHeader").$$render($$result, { class: "space-y-1" }, {}, {
          default: () => {
            return `${validate_component(Card_title, "CardTitle").$$render($$result, { class: "text-2xl text-center" }, {}, {
              default: () => {
                return `Welcome back`;
              }
            })} ${validate_component(Card_description, "CardDescription").$$render($$result, { class: "text-center" }, {}, {
              default: () => {
                return `Enter your email to sign in to your account`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "CardContent").$$render($$result, {}, {}, {
          default: () => {
            return `<form class="space-y-4"><div class="space-y-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
              default: () => {
                return `Email`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                id: "email",
                type: "email",
                placeholder: "name@example.com",
                required: true,
                value: email
              },
              {
                value: ($$value) => {
                  email = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> ${``} ${``} ${validate_component(Button, "Button").$$render(
              $$result,
              {
                type: "submit",
                class: "w-full",
                disabled: loading
              },
              {},
              {
                default: () => {
                  return `${`Sign in with Email`}`;
                }
              }
            )}</form>`;
          }
        })}`;
      }
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
