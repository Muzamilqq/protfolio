import { useState, useEffect, useRef } from "react";
import ProjectDetails from "./ProjectDetails.jsx";

function ProjectModal({
  open,
  onClose,
  title,
  description,
  subDescription,
  href,
  image,
  tags,
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/*
        Mobile  → bottom sheet (slides up, scrollable)
        Desktop → centred dialog
      */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="
          fixed z-50 bg-[#13131a] border border-white/10
          /* mobile bottom sheet */
          bottom-0 left-0 right-0
          rounded-t-3xl
          max-h-[90dvh] overflow-y-auto
          /* desktop centred card */
          sm:bottom-auto sm:left-1/2 sm:top-1/2
          sm:-translate-x-1/2 sm:-translate-y-1/2
          sm:rounded-2xl sm:w-full sm:max-w-lg sm:max-h-[90vh]
          px-5 pb-8 pt-4
          flex flex-col gap-4
        "
      >
        {/* Drag handle — mobile only */}
        <div className="sm:hidden mx-auto mb-1 w-10 h-1 rounded-full bg-white/30 flex-shrink-0" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="
            absolute top-4 right-4
            w-8 h-8 flex items-center justify-center
            rounded-full bg-white/10 hover:bg-white/20
            text-white/70 hover:text-white
            transition text-sm
          "
        >
          ✕
        </button>

        {/* Project image */}
        {image && (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full rounded-xl object-cover max-h-52 flex-shrink-0"
          />
        )}

        {/* Title */}
        <h2 className="text-white font-bold text-xl leading-snug pr-8">
          {title}
        </h2>

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/70"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-white/70 text-sm leading-relaxed">{description}</p>
        )}

        {/* Sub-description */}
        {subDescription && (
          <p className="text-white/50 text-sm leading-relaxed">
            {subDescription}
          </p>
        )}

        {/* CTA link */}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-2 w-full text-center py-3 rounded-xl
              bg-white/10 hover:bg-white/20
              text-white text-sm font-medium
              transition active:scale-95
            "
          >
            View Project →
          </a>
        )}
      </div>
    </>
  );
}

// ─── Project Row ───────────────────────────────────────────────────────────
const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const isCoarsePointer = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches,
  );

  const handleRowTap = () => {
    // On touch devices tapping the row previews the image;
    // tapping "Read More" still opens the modal separately.
    if (isCoarsePointer.current) setPreview?.(image);
  };

  const handleMouseEnter = () => {
    if (!isCoarsePointer.current) setPreview?.(image);
  };

  const handleMouseLeave = () => {
    if (!isCoarsePointer.current) setPreview?.(null);
  };

  return (
    <>
      <div
        className="
          py-8
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-10
        "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleRowTap}
      >
        {/* Left: title + tags */}
        <div className="flex-1 min-w-0">
          <p className="text-xl sm:text-2xl font-medium text-white truncate">
            {title}
          </p>
          <div className="flex flex-wrap gap-3 mt-2 text-sand">
            {tags?.map((tag) => (
              <span key={tag.id} className="text-sm">
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(true);
          }}
          aria-label={`Read more about ${title}`}
          className="
            inline-flex items-center gap-1.5
            /* min 44px tall touch target on mobile */
            min-h-[44px] px-4
            rounded-full
            text-sm font-medium text-white
            bg-white/10 hover:bg-white/20
            active:scale-95
            transition
            cursor-pointer
            hover-animation
            /* Don't stretch full-width on mobile, align left */
            self-start sm:self-auto
          "
        >
          Read More
          <img
            loading="lazy"
            src="assets/arrow-right.svg"
            alt=""
            aria-hidden="true"
            className="w-4 h-4"
          />
        </button>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-px w-full" />

      <ProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        description={description}
        subDescription={subDescription}
        href={href}
        image={image}
        tags={tags}
      />
    </>
  );
};

export default Project;
