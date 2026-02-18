'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ShareMenuProps {
  targetRef: React.RefObject<HTMLDivElement>;
  filePrefix: string;
  pageTitle: string;
}

export default function ShareMenu({ targetRef, filePrefix, pageTitle }: ShareMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCanvas = useCallback(async () => {
    if (!targetRef.current) return null;
    // Scroller en haut pour éviter les décalages
    const prevScrollX = window.scrollX;
    const prevScrollY = window.scrollY;
    window.scrollTo(0, 0);
    // Attendre que le rendu se stabilise
    await new Promise(resolve => setTimeout(resolve, 300));
    const canvas = await html2canvas(targetRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#F5F5F5',
      windowWidth: 1280,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      width: targetRef.current.scrollWidth,
      height: targetRef.current.scrollHeight,
    });
    // Restaurer la position de scroll
    window.scrollTo(prevScrollX, prevScrollY);
    return canvas;
  }, [targetRef]);

  const handleScreenshot = useCallback(async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setIsOpen(false);
    // Attendre que le menu soit masqué dans le DOM
    await new Promise(resolve => setTimeout(resolve, 100));
    try {
      const canvas = await getCanvas();
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `${filePrefix}-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Erreur capture:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, getCanvas, filePrefix]);

  const handlePDF = useCallback(async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setIsOpen(false);
    await new Promise(resolve => setTimeout(resolve, 100));
    try {
      const canvas = await getCanvas();
      if (!canvas) return;
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdfWidth = 297; // A4 paysage
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${filePrefix}-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error('Erreur PDF:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, getCanvas, filePrefix]);

  const handleEmail = useCallback(() => {
    setIsOpen(false);
    const subject = encodeURIComponent(`${pageTitle} - Urtam Formation`);
    const body = encodeURIComponent(`Bonjour,\n\nVoici le lien vers le dashboard Urtam :\n${window.location.href}\n\nCordialement`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [pageTitle]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch (err) {
      console.error('Erreur copie:', err);
    }
  }, []);

  return (
    <div ref={menuRef} className="relative" style={{ visibility: isProcessing ? 'hidden' : 'visible' }}>
      {/* Bouton déclencheur */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isProcessing}
        className="p-2 rounded-lg transition-all hover:bg-gray-100 disabled:opacity-50"
        title="Partager"
      >
        {isProcessing ? (
          <svg className="animate-spin h-5 w-5" style={{ color: '#032b77' }} viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#9CA3AF' }} fill="currentColor" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        )}
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
          <button
            onClick={handleScreenshot}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Capturer en image
          </button>
          <button
            onClick={handlePDF}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Exporter en PDF
          </button>
          <div className="border-t border-gray-100 my-1" />
          <button
            onClick={handleEmail}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Envoyer par email
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.81" />
            </svg>
            {copied ? 'Copié !' : 'Copier le lien'}
          </button>
        </div>
      )}
    </div>
  );
}
